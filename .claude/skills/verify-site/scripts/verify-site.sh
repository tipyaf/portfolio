#!/usr/bin/env bash
# verify-site.sh — End-to-end verification of the portfolio site
# Usage: ./verify-site.sh [--port PORT] [--skip-build] [--skip-lint]
#
# Exit codes:
#   0 = all checks passed
#   1 = one or more checks failed

set -euo pipefail

PORT="${PORT:-3000}"
SKIP_BUILD=false
SKIP_LINT=false
PROJECT_DIR=""
FAILURES=()
PASSES=()

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --port) PORT="$2"; shift 2 ;;
    --skip-build) SKIP_BUILD=true; shift ;;
    --skip-lint) SKIP_LINT=true; shift ;;
    --project-dir) PROJECT_DIR="$2"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

if [[ -z "$PROJECT_DIR" ]]; then
  echo "ERROR: --project-dir is required"
  exit 1
fi

cd "$PROJECT_DIR"

BASE_URL="http://localhost:${PORT}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

pass() {
  PASSES+=("$1")
  echo -e "  ${GREEN}✓${NC} $1"
}

fail() {
  FAILURES+=("$1")
  echo -e "  ${RED}✗${NC} $1"
}

section() {
  echo ""
  echo -e "${BLUE}━━━ $1 ━━━${NC}"
}

# ─── 1. Lint ───
if [[ "$SKIP_LINT" == false ]]; then
  section "Lint Check"
  if npm run lint 2>&1 | tail -3; then
    pass "ESLint passes with no errors"
  else
    fail "ESLint has errors"
  fi
fi

# ─── 2. TypeScript check ───
section "TypeScript Check"
if npx tsc --noEmit 2>&1 | tail -5; then
  pass "TypeScript compilation succeeds"
else
  fail "TypeScript errors found"
fi

# ─── 3. Route checks (BEFORE build, while dev server is running) ───
section "Route Verification (port $PORT)"

check_route() {
  local url="$1"
  local expected_status="$2"
  local label="$3"

  if [[ "$expected_status" == "307" || "$expected_status" == "301" || "$expected_status" == "302" ]]; then
    actual_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$url" 2>/dev/null || echo "000")
  else
    actual_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 -L "$url" 2>/dev/null || echo "000")
  fi

  if [[ "$actual_status" == "$expected_status" ]]; then
    pass "$label → $actual_status"
  else
    fail "$label → expected $expected_status, got $actual_status"
  fi
}

# Check that the dev server is reachable
if ! curl -s --max-time 5 "$BASE_URL" > /dev/null 2>&1; then
  echo -e "  ${YELLOW}⚠ Dev server not reachable at $BASE_URL${NC}"
  echo -e "  ${YELLOW}  Start it with: npm run dev -- -p $PORT${NC}"
  fail "Dev server not running on port $PORT"
else
  # Core routes
  check_route "$BASE_URL/"         "200" "GET / (default locale)"
  check_route "$BASE_URL/fr"       "200" "GET /fr (French)"
  check_route "$BASE_URL/en"       "307" "GET /en (redirect to /)"
  check_route "$BASE_URL/studio"   "200" "GET /studio (Sanity Studio)"

  # ─── 4. Content verification ───
  section "Content Verification"

  # Check homepage has actual content (not empty/error page)
  homepage_size=$(curl -s -L --max-time 15 "$BASE_URL/" 2>/dev/null | wc -c | tr -d ' ')
  if [[ "$homepage_size" -gt 5000 ]]; then
    pass "Homepage has content (${homepage_size} bytes)"
  else
    fail "Homepage seems empty or broken (${homepage_size} bytes)"
  fi

  # Check FR page has actual content
  fr_size=$(curl -s -L --max-time 15 "$BASE_URL/fr" 2>/dev/null | wc -c | tr -d ' ')
  if [[ "$fr_size" -gt 5000 ]]; then
    pass "FR page has content (${fr_size} bytes)"
  else
    fail "FR page seems empty or broken (${fr_size} bytes)"
  fi

  # Check that EN and FR pages are different (language switch works)
  en_body=$(curl -s -L --max-time 15 "$BASE_URL/" 2>/dev/null)
  fr_body=$(curl -s -L --max-time 15 "$BASE_URL/fr" 2>/dev/null)

  if [[ "$en_body" != "$fr_body" ]]; then
    pass "EN and FR pages have different content"
  else
    fail "EN and FR pages are identical (language switching may not work)"
  fi

  # Check hreflang tags on homepage (Next.js renders as hrefLang in dev, hreflang in prod)
  if echo "$en_body" | grep -qi 'hreflang="en"'; then
    pass "Homepage has hreflang=\"en\" tag"
  else
    fail "Homepage missing hreflang=\"en\" tag"
  fi

  if echo "$en_body" | grep -qi 'hreflang="fr"'; then
    pass "Homepage has hreflang=\"fr\" tag"
  else
    fail "Homepage missing hreflang=\"fr\" tag"
  fi

  # Check studio page doesn't have next-intl errors
  studio_body=$(curl -s -L --max-time 15 "$BASE_URL/studio" 2>/dev/null)
  if echo "$studio_body" | grep -qi "next-intl"; then
    fail "Studio page contains next-intl reference (possible misconfiguration)"
  else
    pass "Studio page is clean of next-intl references"
  fi
fi

# ─── 5. Build (AFTER route checks — this overwrites .next and breaks the dev server) ───
if [[ "$SKIP_BUILD" == false ]]; then
  section "Production Build"
  echo -e "  ${YELLOW}Note: Stopping dev server for clean build...${NC}"

  # Kill the dev server to avoid .next conflicts
  lsof -ti:"$PORT" | xargs kill 2>/dev/null || true
  sleep 1
  rm -rf .next

  if npm run build 2>&1 | tail -10; then
    pass "Production build succeeds"
  else
    fail "Production build failed"
  fi

  # Restart the dev server
  echo -e "  ${YELLOW}Restarting dev server on port $PORT...${NC}"
  rm -rf .next
  npm run dev -- -p "$PORT" &
  DEV_PID=$!

  # Wait for dev server to be ready
  for i in $(seq 1 30); do
    if curl -s --max-time 2 "$BASE_URL" > /dev/null 2>&1; then
      echo -e "  ${GREEN}✓${NC} Dev server restarted"
      break
    fi
    sleep 1
  done
fi

# ─── Summary ───
section "Summary"
echo -e "  ${GREEN}Passed: ${#PASSES[@]}${NC}"
echo -e "  ${RED}Failed: ${#FAILURES[@]}${NC}"
echo ""

if [[ ${#FAILURES[@]} -gt 0 ]]; then
  echo -e "${RED}Failed checks:${NC}"
  for f in "${FAILURES[@]}"; do
    echo -e "  ${RED}✗${NC} $f"
  done
  echo ""
  exit 1
else
  echo -e "${GREEN}All checks passed!${NC}"
  exit 0
fi
