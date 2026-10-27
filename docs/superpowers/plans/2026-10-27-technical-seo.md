# Technical SEO Implementation Plan

**Goal:** Resolve verified crawl/canonical contradictions without changing the public language or product experience.
**Architecture:** Keep the established unprefixed Persian canonical URLs; internally rewrite to existing /fa SSG routes. Redirect /fa aliases permanently. Share URL, metadata and route inventory logic across page metadata and sitemap.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Python standard-library HTTP integration tests.

## Constraints and evidence

No production deployment, credential changes, global noindex, translation removal, fake schema or unrelated refactoring. Existing .idea/workspace.xml change belongs to user. Live / redirects 307 to /fa, /fa declares root canonical; finance exhibits the same reverse redirect/canonical conflict. All 17 public route concepts have translated content. /about/team is a Persian-only coming-soon placeholder in every locale, outside the existing sitemap: retain access, apply noindex, do not advertise translated equivalents.

## Task 1 — Routing and metadata consistency

Files: src/middleware.ts, src/app/page.tsx, src/lib/seo.ts, src/i18n/paths.ts, src/i18n/navigation.ts, locale layouts/pages, Header.tsx.
- [ ] Add HTTP regression tests with literal expected canonical homepage, finance and demo URLs, 51 public page checks, locale switching, unknown paths and slash/query normalization.
- [ ] Run against baseline production build; verify root returns 307 rather than expected 200 and Persian canonical URLs redirect.
- [ ] Rewrite default-language URLs internally instead of redirecting; 308 /fa aliases to existing canonical paths; remove fallback root self-redirect.
- [ ] Consolidate page metadata and translated URLs; no canonical defaults inherited by unrelated routes; include page-specific social metadata.
- [ ] Run tests and type checking.

## Task 2 — Sitemap, robots and schema

Files: src/app/sitemap.ts, src/app/robots.ts, locale layout, pricing/feature/contact/team pages, tests/seo_test.py.
- [ ] Test XML parser acceptance, unique indexable sitemap URLs, reciprocal alternates, absent fabricated lastmod, accessible rendering resources, noindex placeholder/404, valid JSON-LD and visible pricing agreement.
- [ ] Observe baseline failures then use shared 17-route inventory × 3 locales for sitemap, remove unsupported timestamp/priority/frequency, unblock /_next assets.
- [ ] Remove duplicate global application/free-price schema; put descriptive app/WebSite schema on homepage, retain Organization/FAQ/breadcrumbs where supported, correct paid Offer units and omit custom-price null offers.
- [ ] Re-run production HTML tests; write before/after URL inventory.

## Task 3 — Rendering, performance and reporting

Files: animation wrappers if invisible-without-JS defect reproduced, docs/seo/*, package.json test scripts.
- [ ] Inspect server HTML and browser visibility with JavaScript disabled; reproduce and test any hidden core content.
- [ ] Measure Lighthouse mobile on baseline and fixed production builds using the same local Chrome environment. Record LCP/CLS/TBT and limitations; do not infer field INP.
- [ ] Preserve pricing switches, locale navigation, FAQ and form client behavior in browser checks without submitting requests.
- [ ] Run tests, lint, TypeScript and production build. Record pre-existing failures separately or make narrowly scoped type-only fixes when needed.
- [ ] Review diff and produce Persian report, route inventory, historical evidence and exact deployment/GSC verification checklist. No deployment or external indexing submissions.
