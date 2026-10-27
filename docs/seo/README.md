# SEO verification artifacts

The final Persian audit report and post-deployment Search Console checklist remain unfinished. Inventories record the original production build (HEAD `640362a`) and the patched production build. Live observations are read-only requests made on 2026-10-27; local results do not mean production has changed.

## Repeat the production checks

Requires the project's Node dependencies and Python 3 (standard library only).

```sh
npm run build
npm run start -- --port 3100
```

In a second terminal:

```sh
npm test
npm run typecheck
npm run lint
python3 tests/seo_inventory.py > docs/seo/url-inventory-after.json
```

`SEO_BASE_URL` can target a different staging/production origin. Run against staging before deployment; the tests perform GET requests only, including unknown URLs, aliases and the www Host-header normalization check. Canonical expectations remain the production HTTPS domain.

For Docker-equivalent runtime, copy `public/` and `.next/static/` into the corresponding standalone application folder, then run its `server.js` with `PORT=3100`. The existing Dockerfile already does these copies. `next start` also serves the checks but warns that standalone deployments should run `server.js`.

Optional browser smoke checks require Playwright and Chrome:

```sh
# If Playwright is provided by a separate runtime, set NODE_PATH to its node_modules.
node tests/browser-smoke.cjs
```

The browser tests cover hydrated navigation, reciprocal language switching, pricing toggles, FAQ state, form presence without submission, and mobile heading visibility with JavaScript disabled. They do not submit demo/contact requests or validate the external CRM/backend.

## Lab measurement

```sh
CHROME_PATH='/path/to/chrome' npx --yes lighthouse http://localhost:3100/ \
  --chrome-flags='--headless=new --no-sandbox' --only-categories=performance \
  --output=json --output-path=/tmp/zimo-lighthouse.json --quiet
```

Use the same Chrome/Lighthouse versions and throttling for comparisons. `performance.json` records one clean run per build, including network and environment limitations. These are lab observations, not field Core Web Vitals or measured INP. An earlier run with missing chunks during a rebuild was discarded entirely.

No credentials, production configuration changes, deployments or indexing-service submissions are included.
