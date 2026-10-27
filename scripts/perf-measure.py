"""Run comparable local Lighthouse mobile audits against an existing production server.

Usage: python3 scripts/perf-measure.py before http://localhost:3102
       python3 scripts/perf-measure.py after http://localhost:3102 [route-name]
Requires Chrome and Lighthouse 13.5.0. Set LIGHTHOUSE_BIN to a local executable
to avoid registry resolution. Raw reports go to /tmp/zimo-perf-<label>/.
"""
import json
import os
import statistics
import subprocess
import sys
import urllib.parse
from pathlib import Path

label, base = sys.argv[1:3]
output = Path('/tmp/zimo-perf-' + label)
output.mkdir(exist_ok=True)
routes = [('fa-home', '/', 3), ('fa-features', '/features', 1),
          ('fa-finance', '/feature/finance', 1), ('fa-pricing', '/pricing', 1),
          ('fa-demo', '/demo', 1), ('en-home', '/en', 1), ('tr-home', '/tr', 1)]
if len(sys.argv) > 3:
    routes = [route for route in routes if route[0] == sys.argv[3]]
    if not routes: raise SystemExit(f'Unknown route: {sys.argv[3]}')
records = []
for name, path, repeats in routes:
    for n in range(repeats):
        target = output / f'{name}-{n+1}.json'
        lighthouse = [os.environ['LIGHTHOUSE_BIN']] if os.environ.get('LIGHTHOUSE_BIN') else ['npx', '--yes', 'lighthouse@13.5.0']
        cmd = [*lighthouse, base.rstrip('/') + path,
               '--chrome-flags=--headless=new --no-sandbox', '--only-categories=performance',
               '--output=json', '--output-path=' + str(target), '--quiet']
        print('MEASURING', label, name, n+1, flush=True)
        run = subprocess.run(cmd, capture_output=True, text=True, timeout=180,
                             env={**os.environ, 'CHROME_PATH': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'})
        if run.returncode: raise RuntimeError(f'Lighthouse failed for {name}: {run.stderr[-1000:]}')
        report = json.loads(target.read_text())
        requests = report['audits']['network-requests']['details']['items']
        scripts = [r for r in requests if urllib.parse.urlsplit(r['url']).hostname == 'localhost' and r.get('resourceType') == 'Script']
        analytics = [r for r in requests if 'googletagmanager.com/gtag/js' in r['url']]
        lcp = report['audits']['largest-contentful-paint']
        metrics = {k: report['audits'][k].get('numericValue') for k in
                   ('first-contentful-paint', 'largest-contentful-paint', 'speed-index',
                    'total-blocking-time', 'cumulative-layout-shift')}
        record = {'route':name,'path':path,'run':n+1,'score':report['categories']['performance']['score']*100,
                  'metrics':metrics,'warnings':report.get('runWarnings',[]),
                  'requestCount':len(requests),'transferBytes':sum(r.get('transferSize',0) for r in requests),
                  'firstPartyScriptBytes':sum(r.get('transferSize',0) for r in scripts),
                  'firstPartyScriptRequests':len(scripts),
                  'analyticsStatus':[r.get('statusCode') for r in analytics],
                  'chatRequestCount':sum('chat.zimo.beauty' in r['url'] for r in requests),
                  'lcpElement':(report.get('audits',{}).get('lcp-breakdown-insight',{}).get('details') or {}).get('items',[])[-1:],
                  'largestContentfulPaint':lcp.get('displayValue')}
        records.append(record)
        print('RESULT', name, record['score'], metrics['largest-contentful-paint'], record['firstPartyScriptBytes'],flush=True)
home = [record for record in records if record['route'] == 'fa-home']
summary = {'label':label,'lighthouseVersion':report['lighthouseVersion'],
           'formFactor':report['configSettings']['formFactor'],
           'throttling':report['configSettings']['throttling'],
           'chromeFlags':'--headless=new --no-sandbox','repetitions':{n:r for n,_,r in routes},
           'records':records,'homeMedians':{k:statistics.median(r[k] if k in r else r['metrics'][k] for r in home) for k in ['score','firstPartyScriptBytes','largest-contentful-paint','total-blocking-time','cumulative-layout-shift']} if home else {}}
Path('docs/performance').mkdir(parents=True, exist_ok=True)
Path('docs/performance/'+label+'.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
