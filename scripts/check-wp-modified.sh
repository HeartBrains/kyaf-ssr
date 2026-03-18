#!/usr/bin/env bash
# Outputs the latest `modified` timestamp (ISO 8601) across all tracked CPTs
# on both WP instances. Prints nothing and exits 0 if all requests fail.
#
# Used by deploy.yml to decide whether a rebuild is needed:
#   - cache hit on the returned timestamp → skip build
#   - cache miss → new content → proceed with build

set -euo pipefail

BKKK_BASE="${VITE_BKKK_BASE_URL:-https://content.bkkkapp.com}/wp-json/wp/v2"
KYAF_BASE="${VITE_KYAF_BASE_URL:-}/wp-json/wp/v2"

CPTS=(exhibitions moving-images residency-artists activities)

latest=""

fetch_latest() {
  local base="$1"
  local cpt="$2"

  # Skip if base URL is empty
  [[ -z "$base" || "$base" == "/wp-json/wp/v2" ]] && return

  local url="${base}/${cpt}?orderby=modified&order=desc&per_page=1&_fields=modified"
  local ts
  ts=$(curl -sf --max-time 8 "$url" \
    | grep -o '"modified":"[^"]*"' \
    | head -1 \
    | sed 's/"modified":"//;s/"//') || true

  [[ -z "$ts" ]] && return

  # Keep the lexicographically greater (more recent) timestamp
  if [[ -z "$latest" || "$ts" > "$latest" ]]; then
    latest="$ts"
  fi
}

for cpt in "${CPTS[@]}"; do
  fetch_latest "$BKKK_BASE" "$cpt"
  fetch_latest "$KYAF_BASE" "$cpt"
done

# Output the latest timestamp (empty string if all requests failed)
echo "$latest"
