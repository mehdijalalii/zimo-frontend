"""Production HTTP SEO contracts. Build/start first; SEO_BASE_URL defaults to localhost:3100."""
import concurrent.futures
import json
import os
import unittest
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

BASE = os.environ.get('SEO_BASE_URL', 'http://localhost:3100').rstrip('/')
ORIGIN = 'https://zimo.beauty'
LOCALES = ('fa', 'en', 'tr')
ROUTES = ('', '/features', '/pricing', '/faq', '/about', '/contact', '/demo') + tuple(
    '/feature/' + slug for slug in ('appointments', 'finance', 'branches', 'loyalty', 'payroll',
                                    'reporting', 'security', 'staff-performance', 'staff-dashboard', 'marketing-crm'))
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

def fetch(path, headers=None):
    req = urllib.request.Request(BASE + path, headers=headers or {})
    try:
        r = urllib.request.build_opener(NoRedirect).open(req, timeout=30)
    except urllib.error.HTTPError as e:
        r = e
    with r:
        return r.status, r.headers, r.read().decode(errors='replace')

class HTML(HTMLParser):
    def __init__(self, body):
        super().__init__(convert_charrefs=True)
        self.links, self.meta, self.anchors, self.images, self.schema = [], [], [], [], []
        self.elements = []
        self.html, self.h1, self.title, self.text, self.hidden_h1 = {}, 0, '', '', False
        self.hidden_headings = []
        self.stack = []
        self.script = None
        self.feed(body)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.elements.append((tag, a))
        if tag == 'html': self.html = a
        if tag == 'link': self.links.append(a)
        if tag == 'meta': self.meta.append(a)
        if tag == 'a': self.anchors.append(a.get('href', ''))
        if tag == 'img': self.images.append(a)
        if tag == 'h1':
            self.h1 += 1
            self.hidden_h1 |= any('opacity:0' in x.get('style', '').replace(' ', '') for _, x in self.stack)
        if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6') and any('opacity:0' in x.get('style', '').replace(' ', '') for _, x in self.stack):
            self.hidden_headings.append(tag)
        if tag == 'script': self.script = '' if a.get('type') == 'application/ld+json' else None
        if tag not in ('meta', 'link', 'img', 'input', 'br', 'hr', 'source', 'area', 'wbr', 'embed', 'param', 'base', 'col'):
            self.stack.append((tag, a))
    def handle_endtag(self, tag):
        if tag == 'script' and self.script is not None:
            value = json.loads(self.script)
            self.schema.extend(value if isinstance(value, list) else [value])
            self.script = None
        for i in range(len(self.stack)-1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break
    def handle_data(self, data):
        if self.script is not None: self.script += data
        tags = [t for t, _ in self.stack]
        if 'title' in tags: self.title += data
        if 'script' not in tags and 'style' not in tags: self.text += data
    def canonical(self): return [x['href'] for x in self.links if x.get('rel') == 'canonical']
    def alternates(self): return {x['hreflang']: x['href'] for x in self.links if 'hreflang' in x}
    def meta_value(self, name): return next((x.get('content', '') for x in self.meta if x.get('name', x.get('property')) == name), '')

def canonical_path(locale, route):
    return (('' if locale == 'fa' else '/' + locale) + route) or '/'

class SEOTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        paths = [canonical_path(loc, route) for loc in LOCALES for route in ROUTES]
        with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
            cls.responses = dict(zip(paths, ex.map(fetch, paths)))
        cls.pages = {p: HTML(r[2]) for p, r in cls.responses.items() if r[0] == 200}
        cls.sitemap_status, _, xml = fetch('/sitemap.xml')
        cls.sitemap = ET.fromstring(xml)

    def test_home_finance_demo_canonicals(self):
        for path, canonical in [('/', ORIGIN), ('/en', ORIGIN+'/en'), ('/tr', ORIGIN+'/tr'),
                                ('/feature/finance', ORIGIN+'/feature/finance'), ('/demo', ORIGIN+'/demo')]:
            with self.subTest(path=path):
                self.assertEqual(self.responses[path][0], 200)
                self.assertEqual(self.pages[path].canonical(), [canonical])

    def test_all_public_routes_and_reciprocal_hreflang(self):
        titles = {loc: set() for loc in LOCALES}
        for loc in LOCALES:
            for route in ROUTES:
                path = canonical_path(loc, route)
                with self.subTest(path=path):
                    status, headers, _ = self.responses[path]
                    self.assertEqual(status, 200, f'{path}: {headers.get("Location")}')
                    p = self.pages[path]
                    self.assertEqual(p.canonical(), [ORIGIN + ('' if path == '/' else path)])
                    self.assertNotIn('canonical', headers.get('Link', '').lower())
                    self.assertNotIn('noindex', headers.get('X-Robots-Tag', '').lower())
                    self.assertNotIn('noindex', p.meta_value('robots'))
                    self.assertEqual(p.alternates(), {l: ORIGIN+('' if canonical_path(l, route) == '/' else canonical_path(l, route)) for l in LOCALES})
                    self.assertEqual(p.html.get('lang'), loc)
                    self.assertEqual(p.html.get('dir'), 'rtl' if loc == 'fa' else 'ltr')
                    self.assertEqual(p.h1, 1)
                    self.assertGreater(len(p.title), 10)
                    self.assertNotIn(p.title, titles[loc])
                    titles[loc].add(p.title)
                    self.assertGreater(len(p.meta_value('description')), 30)
                    self.assertEqual(p.meta_value('og:url'), ORIGIN + ('' if path == '/' else path))
                    self.assertEqual(p.meta_value('og:title'), p.meta_value('twitter:title'))
                    self.assertGreater(len(p.text), 700)
                    for img in p.images: self.assertIn('alt', img)

    def test_sitemap_is_canonical_complete_xml(self):
        self.assertEqual(self.sitemap_status, 200)
        self.assertEqual(self.sitemap.tag, '{'+NS['s']+'}urlset')
        urls = self.sitemap.findall('s:url', NS)
        actual = [u.findtext('s:loc', namespaces=NS) for u in urls]
        expected = {ORIGIN+('' if canonical_path(l, r) == '/' else canonical_path(l, r)) for l in LOCALES for r in ROUTES}
        self.assertEqual(len(actual), len(expected))
        self.assertEqual(set(actual), expected)
        for url in urls:
            loc = url.findtext('s:loc', namespaces=NS)
            path = urllib.parse.urlsplit(loc).path or '/'
            with self.subTest(url=loc):
                self.assertEqual(self.responses[path][0], 200)
                self.assertEqual(self.pages[path].canonical(), [loc])
                self.assertIsNone(url.find('s:lastmod', NS))
                self.assertEqual({x.attrib['hreflang']:x.attrib['href'] for x in url.findall('x:link', NS)}, self.pages[path].alternates())

    def test_alias_redirects_slashes_and_language_independence(self):
        for path, target in [('/fa', '/'), ('/fa/feature/finance', '/feature/finance'), ('/fa/demo?source=test', '/demo?source=test'),
                             ('/en/', '/en'), ('/tr/', '/tr'), ('/features/', '/features')]:
            with self.subTest(path=path):
                status, headers, _ = fetch(path)
                self.assertEqual(status, 308)
                location = urllib.parse.urlsplit(headers['Location'])
                self.assertEqual(location.path + ('?'+location.query if location.query else ''), target)
        for headers in ({'Accept-Language':'en-US'}, {'User-Agent':'Googlebot', 'Cookie':'locale=tr'}):
            status, _, body = fetch('/', headers)
            self.assertEqual(status, 200)
            self.assertEqual(HTML(body).html.get('lang'), 'fa')

    def test_www_host_consolidates_without_a_locale_chain(self):
        for path, expected in [('/en/pricing', ORIGIN+'/en/pricing'), ('/fa/feature/finance', ORIGIN+'/feature/finance')]:
            with self.subTest(path=path):
                status, headers, _ = fetch(path, {'Host':'www.zimo.beauty'})
                self.assertEqual(status, 308)
                self.assertEqual(headers['Location'], expected)

    def test_assets_allowed_and_nonpublic_routes_not_indexed(self):
        status, _, robots = fetch('/robots.txt')
        self.assertEqual(status, 200)
        self.assertNotIn('Disallow: /_next', robots)
        self.assertIn('Sitemap: '+ORIGIN+'/sitemap.xml', robots)
        for path in ['/login', '/admin', '/dashboard', '/api/seo-audit-missing', '/en/not-a-page', '/de/pricing', '/feature/unknown']:
            with self.subTest(path=path):
                status, headers, body = fetch(path)
                self.assertEqual(status, 404)
                self.assertIn('noindex', HTML(body).meta_value('robots') + headers.get('X-Robots-Tag', ''))
        for path in ['/about/team', '/en/about/team', '/tr/about/team']:
            with self.subTest(path=path):
                status, _, body = fetch(path)
                self.assertEqual(status, 200)
                p = HTML(body)
                self.assertIn('noindex', p.meta_value('robots'))
                self.assertEqual(p.alternates(), {})
                self.assertEqual(p.canonical(), [ORIGIN+path])
        self.assertEqual(fetch('/fonts/iransansx/IRANSansXV.woff2')[0], 200)

    def test_internal_links_use_resolving_canonical_destinations(self):
        for path, p in self.pages.items():
            for href in p.anchors:
                parsed = urllib.parse.urlsplit(href)
                if parsed.netloc and parsed.netloc != 'zimo.beauty': continue
                if parsed.scheme not in ('', 'https'): continue
                dest = parsed.path
                if not dest: continue
                with self.subTest(path=path, href=href):
                    self.assertIn(dest, self.pages)
                    self.assertEqual(self.pages[dest].canonical(), [ORIGIN+('' if dest == '/' else dest)])
        for slug in ('finance', 'appointments', 'marketing-crm', 'loyalty', 'payroll', 'branches'):
            self.assertIn('/feature/'+slug, self.pages.get('/', HTML('')).anchors)

    def test_initial_content_does_not_require_js_for_visibility(self):
        for path, p in self.pages.items():
            with self.subTest(path=path): self.assertEqual(p.hidden_headings, [], 'Headings are inside opacity:0 server-rendered wrappers')

    def test_homepage_pricing_accessibility(self):
        for path in ['/', '/en', '/tr']:
            with self.subTest(path=path):
                p = self.pages[path]
                menu = [a for tag, a in p.elements if tag == 'button' and 'lg:hidden' in a.get('class', '')]
                self.assertEqual(len(menu), 1)
                self.assertTrue(menu[0].get('aria-label'))
                self.assertEqual(menu[0].get('aria-expanded'), 'false')
                headings = [(tag, a) for tag, a in p.elements if tag in ('h3', 'h4', 'h5') and 'mt-4' in a.get('class', '') and 'tracking-wider' in a.get('class', '')]
                self.assertEqual(len(headings), 3)
                self.assertTrue(all(tag == 'h4' for tag, _ in headings))
                self.assertTrue(all('text-gray-600' in a.get('class', '') for _, a in headings))
                old_prices = [a for tag, a in p.elements if tag == 'span' and 'line-through' in a.get('class', '')]
                if path == '/': self.assertTrue(old_prices)
                self.assertTrue(all('text-gray-600' in a.get('class', '') for a in old_prices))
                labels = [a for tag, a in p.elements if tag == 'span' and 'text-[10px]' in a.get('class', '')]
                self.assertTrue(labels)
                self.assertTrue(all('text-gray-600' in a.get('class', '') for a in labels))
                copyright = [a for tag, a in p.elements if tag == 'p' and 'text-sm' in a.get('class', '') and 'text-gray-400' in a.get('class', '')]
                self.assertTrue(copyright)
                footer_description = [a for tag, a in p.elements if tag == 'p' and 'leading-[1.7]' in a.get('class', '')]
                self.assertTrue(any('text-gray-400' in a.get('class', '') for a in footer_description))

    def test_structured_data_has_no_invented_free_or_null_offers(self):
        for path, p in self.pages.items():
            apps = [s for s in p.schema if s.get('@type') == 'SoftwareApplication']
            with self.subTest(path=path):
                self.assertLessEqual(len(apps), 1)
                for s in p.schema: self.assertEqual(s.get('@context'), 'https://schema.org')
                for app in apps:
                    offers = app.get('offers', [])
                    if isinstance(offers, dict): offers = [offers]
                    for offer in offers:
                        self.assertIsNotNone(offer.get('price'))
                        self.assertGreater(float(offer['price']), 0)
                if path == '/pricing':
                    self.assertEqual([o['price'] for o in apps[0]['offers']], [39900000, 59900000])
                for s in p.schema:
                    if s.get('@type') == 'BreadcrumbList':
                        for item in s['itemListElement']: self.assertIn(item['item'], [ORIGIN+('' if x == '/' else x) for x in self.pages])

if __name__ == '__main__':
    unittest.main(verbosity=2)
