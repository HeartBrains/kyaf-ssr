# kyaf-ssr

Combined site for Bangkok Kunsthalle (`/bkkk`) and Khao Yai Art Forest (`/kyaf`) with a shared landing page at `/`.

Built with [TanStack Start](https://tanstack.com/start) (SSR, Node.js server via Nitro).

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # outputs to .output/
npm run start      # node .output/server/index.mjs
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `WORDPRESS_BKKK_API_URL` | WordPress REST API base URL for Bangkok Kunsthalle | No (falls back to mock data) |
| `WORDPRESS_KYAF_API_URL` | WordPress REST API base URL for Khao Yai Art Forest | No (falls back to mock data) |
| `PORT` | Server port (default: 3000) | No |

## Deployment (Hostinger Cloud Startup)

The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys automatically on every push to `main`.

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `HOSTINGER_SSH_HOST` | Server IP or hostname |
| `HOSTINGER_SSH_USER` | SSH username |
| `HOSTINGER_SSH_KEY` | Private SSH key (PEM format) |
| `HOSTINGER_DEPLOY_PATH` | Remote deploy path, e.g. `/home/user/kyaf-ssr` |
| `GITLAB_TOKEN` | GitLab Personal Access Token (for mirror push) |

### First-time server setup

```bash
# On Hostinger server
npm install -g pm2
mkdir -p ~/kyaf-ssr
# After first deploy via GitHub Actions:
cd ~/kyaf-ssr && pm2 start ecosystem.config.js && pm2 save && pm2 startup
```

## Scheduled Rebuilds

The workflow also runs on a **hourly cron** (`0 * * * *`). Before building, it queries both WP instances for the latest `modified` timestamp across all CPTs. If the timestamp matches the previous build's cache key, the build is skipped — no unnecessary Puppeteer runs.

### How it works

1. Hostinger cron fires a `curl` to GitHub's `workflow_dispatch` API every hour
2. The workflow checks WP for content changes via `scripts/check-wp-modified.sh`
3. Cache hit → skip; cache miss → full build + deploy

### Hostinger cron command

In Hostinger's cron panel, add a job running every hour with this command:

```bash
curl -s -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <GITHUB_PAT>" \
  https://api.github.com/repos/HeartBrains/kyaf-ssr/actions/workflows/deploy.yml/dispatches \
  -d '{"ref":"main"}'
```

Replace `<GITHUB_PAT>` with a GitHub Personal Access Token that has the **`workflow`** scope.

> The token is visible in Hostinger's cron panel — rotate it if panel access is shared.

### Additional GitHub Secrets required

| Secret | Description |
|--------|-------------|
| `VITE_BKKK_BASE_URL` | Base URL for BKKK site (e.g. `https://bkkk.art`) |
| `VITE_KYAF_BASE_URL` | Base URL for KYAF site (e.g. `https://khaoyaiartforest.com`) |

These are used both for canonical URLs in the build and for the WP change-detection check.

## GitLab Mirror

This repo is mirrored to `gitlab.com/mrolim77/kyaf-ssr` on every push to `main`.

## Route Structure

```
/           Landing page (BKK / KYAF selector)
/bkkk/*     Bangkok Kunsthalle
/kyaf/*     Khao Yai Art Forest
```
