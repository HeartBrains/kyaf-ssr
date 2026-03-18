# Spec: Scheduled Rebuild via Hostinger Cron

## Problem Statement

The site is prerendered at build time. When WordPress content is updated, the deployed HTML becomes stale until the next manual push to `main`. There is no automated mechanism to rebuild when content changes.

Hostinger provides a cron feature. The goal is to use it to trigger a GitHub Actions rebuild every hour, but only when WP content has actually changed since the last build — avoiding unnecessary Puppeteer runs (~3 min each).

---

## Constraints

- Hostinger is a static Apache host — no Node.js runtime, only cron + curl available
- GitHub Actions already handles build + rsync deploy on push to `main`
- The GitHub PAT will be embedded directly in the Hostinger cron curl command
- No failure notifications required — silent retry on next cycle is acceptable
- Both WP instances must be checked: `content.bkkkapp.com` (BKKK) and the KYAF WP instance

---

## Approach

### Trigger: Hostinger cron → GitHub `workflow_dispatch` API

Hostinger cron runs a `curl` command every hour. The curl hits the GitHub REST API to dispatch the workflow. GitHub Actions then runs the full build + deploy.

```
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <GITHUB_PAT>" \
  https://api.github.com/repos/HeartBrains/kyaf-ssr/actions/workflows/deploy.yml/dispatches \
  -d '{"ref":"main"}'
```

### Change Detection: skip rebuild if content is unchanged

To avoid rebuilding when nothing has changed, a new GitHub Actions job step checks the WP `modified` date before running the full build.

**Logic:**
1. Query each CPT on both WP instances with `orderby=modified&per_page=1`
2. Extract the most recent `modified` timestamp across all CPTs
3. Compare against the timestamp stored from the previous successful build (persisted via GitHub Actions cache)
4. If the most recent WP `modified` <= last build timestamp → skip build, exit 0
5. If newer → proceed with full `npm run build` + deploy

**CPTs to check (both sites):**
- `exhibitions`
- `moving-images`
- `residency-artists`
- `activities`

**WP base URLs:**
- BKKK: `https://content.bkkkapp.com/wp-json/wp/v2`
- KYAF: value of `VITE_KYAF_BASE_URL` GitHub secret + `/wp-json/wp/v2`

### Timestamp persistence

Use a **GitHub Actions cache** keyed on the latest WP `modified` value. If the cache key already exists, the content hasn't changed → skip. If it's a cache miss → content is new → build.

This avoids committing to git or maintaining external state.

---

## Implementation Steps

1. **Add `schedule` trigger to `deploy.yml`** — `cron: '0 * * * *'` (every hour on the hour)
2. **Add change-detection step** in `deploy.yml` before the build step:
   - Shell script queries all CPTs on both WP instances
   - Finds the latest `modified` timestamp across all results
   - Uses `actions/cache` with that timestamp as the key
   - Sets a `skip` job output if cache hit
3. **Gate build + deploy steps** on `steps.check.outputs.skip != 'true'`
4. **Add `scripts/check-wp-modified.sh`** — the shell script used in step 2 (reusable, testable outside CI)
5. **Document the Hostinger cron command** in `README.md` under a new "Scheduled Rebuilds" section — include the exact `curl` command with `<GITHUB_PAT>` placeholder and PAT scope requirements

---

## Acceptance Criteria

- `deploy.yml` has a `schedule: - cron: '0 * * * *'` trigger
- When dispatched and WP content is unchanged, the workflow exits before `npm run build` (Actions log shows: "No WP changes detected, skipping build")
- When dispatched and WP content has changed, the full build + deploy runs and completes successfully
- The Hostinger cron `curl` command successfully triggers the workflow (manual test: run curl, verify workflow appears in GitHub Actions tab)
- No secrets are committed to the repository

---

## Files Changed

| File | Change |
|---|---|
| `.github/workflows/deploy.yml` | Add `schedule` trigger + change-detection step + conditional gates |
| `scripts/check-wp-modified.sh` | New — queries WP APIs, outputs latest modified timestamp |
| `README.md` | Add "Scheduled Rebuilds" section with Hostinger cron setup instructions |

---

## Known Limitations

- GitHub Actions cache has a 7-day TTL — after 7 days of no cron runs the cache expires and a full rebuild triggers even if content hasn't changed (harmless)
- The PAT embedded in Hostinger's cron panel is visible to anyone with Hostinger panel access — rotate it if access is shared
- If both WP instances are unreachable during the check, the script treats it as "no change" and skips the build (safe default — avoids broken builds on WP downtime)
- `workflow_dispatch` rate limit: GitHub allows 1000 API requests/hour per token; hourly cron is well within limits
