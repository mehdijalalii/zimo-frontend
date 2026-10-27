# Production Performance Optimization Plan

**Goal:** Reduce first-party JavaScript and critical-path costs while retaining all 51 public canonical routes and existing user interactions.
**Architecture:** Keep SSG for the static marketing pages. Measure production HTML and Chrome lab runs, then remove unnecessary client boundaries and defer noncritical third-party work. Verify against the established HTTP SEO suite and browser flows.
**Tech Stack:** Next.js 16.2.9 App Router/Turbopack, React 19, Lighthouse 13.5, Python HTTP tests, Playwright browser smoke tests.

## Constraints

Preserve Persian unprefixed canonical routes, 308 /fa aliases, independent /en and /tr, sitemap/hreflang, design, forms, Chatwoot and analytics. No deployment or infrastructure changes. Do not touch the pre-existing .idea/workspace.xml modification. No speculative image, font, caching or rendering changes.

## Task 1: Baseline and diagnosis

- [x] Build production output and record static route table.
- [x] Audit 7 representative routes with fixed Lighthouse mobile settings, 3 repeats of homepage, identical Chrome and third-party conditions. Record metrics, requests, first-party JS transfer and warnings.
- [x] Inspect LCP element and breakdown from raw Lighthouse JSON. Inventory static/client component boundaries, image/font/third-party requests and Next's bundle analysis.
- [x] Rank verified bottlenecks and select low-risk fixes.

## Task 2: Focused changes

- [x] Write HTTP/browser checks for changed SEO and interaction behavior.
- [x] Apply measurements-supported first-party and third-party loading changes; preserve initial server-rendered content and keyboard access.
- [x] Record exact code paths and expected effect of each change.

## Task 3: Verification and report

- [x] Run lint, typecheck, production build, SEO HTTP suite, browser smoke flows and no-JS rendering checks.
- [x] Repeat the same Lighthouse runs, compare medians and initial JavaScript bytes; record limitations, including CPU, image caches and third-party variability.
- [x] Reaudit canonical, hreflang, sitemap, robots, lang/dir, JSON-LD and response codes.
- [x] Deliver Persian report with route strategy, bottlenecks, files changed, before/after data, remaining opportunities and exact Nginx/CDN recommendations where warranted.
