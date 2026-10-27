"""Write a reviewable URL inventory against an already running production server."""
import concurrent.futures
import json
import urllib.parse
from seo_test import BASE, ORIGIN, ROUTES, LOCALES, HTML, canonical_path, fetch, ET, NS

_, _, xml = fetch('/sitemap.xml')
sitemap_urls = {x.text for x in ET.fromstring(xml).findall('s:url/s:loc', NS)}
paths = sorted({canonical_path(l, r) for l in LOCALES for r in ROUTES} |
               {'/fa'+r for r in ROUTES if r} | {'/fa', '/about/team', '/en/about/team', '/tr/about/team'})

def inspect(path):
    current, chain = path, []
    for _ in range(5):
        status, headers, body = fetch(current)
        if status not in (301, 302, 303, 307, 308): break
        chain.append({'path': current, 'status': status, 'location': headers.get('Location')})
        dest = urllib.parse.urlsplit(headers['Location'])
        current = dest.path + ('?'+dest.query if dest.query else '')
    p = HTML(body)
    public = ORIGIN + ('' if path == '/' else path)
    return {'path': path, 'locale': p.html.get('lang'), 'initialStatus': chain[0]['status'] if chain else status,
            'redirects': chain, 'finalPath': current, 'finalStatus': status, 'canonical': p.canonical(),
            'robots': p.meta_value('robots') or 'index, follow (default)', 'headerRobots': headers.get('X-Robots-Tag'),
            'sitemapIncluded': public in sitemap_urls, 'hreflang': p.alternates(), 'title': p.title, 'h1Count': p.h1,
            'hiddenHeadingCount': len(p.hidden_headings), 'intendedIndexable': not (path == '/fa' or path.startswith('/fa/')) and not path.endswith('/team')}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
    inventory = list(executor.map(inspect, paths))
print(json.dumps({'base': BASE, 'urls': inventory}, ensure_ascii=False, indent=2))
