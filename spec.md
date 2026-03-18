# Full Content Migration to WordPress Spec

## Problem Statement

All real content currently hardcoded in TypeScript data files needs to be migrated into WordPress via WP-CLI scripts run over SSH. This covers both BKKK and KYAF sites. Press items are skipped (placeholder data only). KYAF has no residency artists. Full HTML body content from `detailContent.ts` is included. After migration, the frontend will be wired to consume the WordPress REST API.

---

## Environment

- **WordPress**: `content.bkkkapp.com`, WP-CLI available via SSH
- **SSH**: `u202460562@72.61.122.41` port `65002`
- **Method**: WP-CLI `wp eval-file` PHP scripts — automated, all at once
- **Forms**: JetFormBuilder forms built after migration for future manual updates

---

## Content Inventory

### BKKK Exhibitions (`exhibitionsDataNew.ts`) — 16 records
| Slug | Status |
|---|---|
| nine-plus-five-works | past |
| nostalgia-for-unity | past |
| mend-piece | past |
| like-nouns-slipping-into-verbs | past |
| calligraphic-abstraction | past |
| painting-as-event | past |
| poetics-of-horizontality | past |
| this-page-is-intentionally-left-blank | past |
| mitta-del-santi | past |
| vernacular-objects | past |
| description-without-place | past |
| forever-love-soul-engine | past |
| blind-spots-panels-paravents-and-screens | past |
| soul-searching | past |
| splendor-in-the-city | past |
| a-bit-fountain-and-a-bit-not | past |
| dial-a-poem-thailand | past |

Full HTML body content from `detailContent.ts` migrated to `content_en` meta field.

### BKKK Moving Image Programs (`movingImageData.ts`) — 7 records
| Slug | Status |
|---|---|
| upcoming-program-2026 | upcoming |
| infringes | past |
| search-for-life-i | past |
| shapeshifting-spaces | past |
| we-gather | past |
| seeds | past |
| inviting-you-to-die-with-me | current |

Full HTML body content from `detailContent.ts` migrated to `content_en`.

### BKKK Residency Artists (`residencyData.ts`) — 10 records
| Slug | Status |
|---|---|
| upcoming-artist-2026 | upcoming |
| emma-mccormick-goodhart | past |
| natalie-bruck | past |
| cole-lu | past |
| nicolas-amato | past |
| anthony-huberman | past |
| spencer-sweeney | past |
| luca-lo-pinto | past |
| eduardo-williams | past |
| apichaya-wannakit | past |

Full HTML bio/statement content from `detailContent.ts` migrated to `bio_en`.

### BKKK Team Members (`teamDataBilingual.ts`) — ~20 records
All real names and roles. Groups: founder, directors, team, advisory-board.

### BKKK Activities (`mockDataBilingual.ts` + new from previous spec) — 6 records
- unwinding-architecture (exhibition type — skip, already in exhibitions)
- art-as-reflection (blog post type — migrate to blog_post CPT)
- concrete-ghosts-becoming-human (upcoming)
- concrete-ghosts-white-building (upcoming)
- club-pluto (upcoming)
- tagteams-2026 (upcoming)

### KYAF Exhibitions (`exhibitionsDataNew.ts`) — 10 records
| Slug | Status |
|---|---|
| madrid-circle | current |
| khao-yai-fog-forrest | current |
| god | current |
| two-planets-series | current |
| pulsus-vitae | current |
| k-bar | current |
| pilgrimage-to-eternity | current |
| maman | past |
| light-shadow-2025 | past |
| earth-tones-2025 | past |

Full HTML body content from KYAF `detailContent.ts` migrated to `content_en`.

### KYAF Activities (`activitiesDataNew.ts`) — 4 records
- k-bar-experience (current)
- forest-print (current) — from previous spec
- bamboo-journey-lunch (current) — from previous spec
- forest-table-dinner (current) — from previous spec

### KYAF Team Members (`teamDataBilingual.ts`) — ~15 records
All real names and roles.

### Skipped
- Press items (both sites) — placeholder data, skip
- KYAF Residency — no data exists

---

## Migration Approach

### One PHP script per CPT, executed via `wp eval-file`

Each script:
1. Reads data hardcoded as a PHP array (transcribed from TypeScript source)
2. Creates a WP post with `wp_insert_post()`
3. Sets all meta fields with `update_post_meta()`
4. Sets `site` meta field (`bkkk` or `kyaf`)
5. Is idempotent — checks for existing slug before inserting to allow re-runs

### Scripts to create (run in order)

| Script | CPT | Site |
|---|---|---|
| `migrate-bkkk-exhibitions.php` | exhibition | bkkk |
| `migrate-bkkk-moving-image.php` | moving_image | bkkk |
| `migrate-bkkk-residency.php` | residency_artist | bkkk |
| `migrate-bkkk-team.php` | team_member | bkkk |
| `migrate-bkkk-activities.php` | activity | bkkk |
| `migrate-kyaf-exhibitions.php` | exhibition | kyaf |
| `migrate-kyaf-activities.php` | activity | kyaf |
| `migrate-kyaf-team.php` | team_member | kyaf |

### Field Mapping

**Exhibition → WP CPT `exhibition`**
- `post_title` ← `title.en`
- `post_name` ← `slug`
- `post_status` ← `publish`
- `title_th` ← `title.th`
- `artist_en` ← `artist.en`
- `artist_th` ← `artist.th`
- `curator_en` ← `curator.en`
- `curator_th` ← `curator.th`
- `from_date` ← `fromDate`
- `to_date` ← `toDate`
- `date_display_en` ← `dateDisplay.en`
- `date_display_th` ← `dateDisplay.th`
- `year` ← `year`
- `status` ← `status`
- `featured_image_url` ← `featuredImage`
- `gallery` ← serialized `gallery[]`
- `image_credits` ← `imageCredits`
- `tags_en` ← `tags`
- `content_en` ← HTML from `detailContent.ts` matched by slug
- `site` ← `bkkk` or `kyaf`

**Moving Image → WP CPT `moving_image`**
Same as Exhibition plus:
- `films` ← serialized array of `{ title, artist, year, duration, description }`

**Residency Artist → WP CPT `residency_artist`**
- `post_title` ← `name`
- `post_name` ← `slug`
- `status` ← `status`
- `bio_en` ← HTML from `detailContent.ts` matched by slug
- `featured_image_url` ← `featuredImage`
- `gallery` ← serialized `gallery[]`
- `site` ← `bkkk`

**Team Member → WP CPT `team_member`**
- `post_title` ← `name`
- `role_en` ← `role`
- `role_th` ← `roleTH`
- `group` ← group key
- `order` ← position in array
- `site` ← `bkkk` or `kyaf`

**Activity → WP CPT `activity`**
- `post_title` ← `title.en` (KYAF) or `titleEN` (BKKK)
- `post_name` ← `slug`
- `title_th` ← `title.th`
- `date_display_en` ← `dateDisplay.en`
- `date_display_th` ← `dateDisplay.th`
- `status` ← `status`
- `categories_en` ← `categories.en` joined
- `content_en` ← `listingSummary.en` (KYAF) or content body (BKKK)
- `featured_image_url` ← `featuredImage`
- `site` ← `bkkk` or `kyaf`

---

## Implementation Steps

1. **Restore SSH key** — add new public key to Hostinger `authorized_keys`
2. **Run CPT + meta field setup** (from previous spec) via `wp eval-file setup-cpts.php`
3. **Add CORS headers** to `.htaccess`
4. **Write and run migration scripts** in order (8 scripts total)
5. **Verify REST API** — spot-check each CPT endpoint returns correct records
6. **Wire frontend** — `src/lib/wp-api.ts`, `src/lib/wp-mappers.ts`, `src/lib/useWPData.ts`
7. **Replace Exhibitions** static import with WP hook (BKKK + KYAF)
8. **Replace remaining CPTs** one at a time (Moving Image, Activities, Residency, Team)
9. **Run `npm run build`** — verify no errors
10. **Commit and push** — CI deploys to Hostinger

---

## Acceptance Criteria

- [ ] SSH key restored and server accessible
- [ ] All 7 CPTs created with correct meta fields
- [ ] CORS headers present — `Access-Control-Allow-Origin: *`
- [ ] BKKK: 17 exhibitions in WP with full HTML content
- [ ] BKKK: 7 moving image programs in WP
- [ ] BKKK: 10 residency artists in WP
- [ ] BKKK: ~20 team members in WP
- [ ] BKKK: 4 activities in WP (Concrete Ghosts ×2, cluB pluto, TagTEAMS)
- [ ] KYAF: 10 exhibitions in WP
- [ ] KYAF: 4 activities in WP
- [ ] KYAF: ~15 team members in WP
- [ ] `site` filter works correctly for all CPTs
- [ ] Frontend Exhibitions page (BKKK + KYAF) renders from WP data
- [ ] All other CPT pages render from WP data
- [ ] `npm run build` passes
- [ ] Static data files kept as reference (not deleted)

---

## What Is NOT in Scope

- Press items (both sites) — skipped
- KYAF residency — no data
- Thai translations for new activity content (placeholder EN used)
- JetFormBuilder form creation (separate step after migration)
- Search re-indexing
