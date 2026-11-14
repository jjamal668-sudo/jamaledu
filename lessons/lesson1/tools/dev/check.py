"""فحص العرض: أخطاء الكونسول، الرجوع يعيد الصورة نفسها، القفز يساوي التنقل خطوة خطوة، لقطات منتصف الحركة.
التشغيل (من مجلد الموقع):  python3 -m http.server 8766  ثم  python3 lessons/lesson1/tools/dev/check.py
"""
import sys, json, os
from playwright.sync_api import sync_playwright
from PIL import Image, ImageChops
URL = os.environ.get('SHOW_URL', 'http://localhost:8766/lessons/lesson1/index.html')
OUT = os.environ.get('OUT', '/tmp/l1check'); os.makedirs(OUT, exist_ok=True)
SIZES = [(1366, 768), (1180, 820), (390, 844)]
FREEZE = "#fx{display:none!important} *,*::before,*::after{animation:none!important;transition:none!important} #toast{display:none!important}"
def state(pg):
    return pg.evaluate("""(()=>{const c=Cam.get();return {cx:Math.round(c.cx*10)/10,cy:Math.round(c.cy*10)/10,s:Math.round(c.s*1e5)/1e5,
      on:[...document.querySelectorAll('[data-r].on')].map(e=>e.getAttribute('data-r')).sort().join(','),
      dim:[...document.querySelectorAll('.dim')].length, lit:[...document.querySelectorAll('.era.lit')].length,
      cnt:document.getElementById('cnt').textContent}})()""")
def settle(pg):
    pg.wait_for_function("!Cam.tween", timeout=8000); pg.wait_for_timeout(120)
def diff(a, b):
    A = Image.open(a).convert('RGB'); Bm = Image.open(b).convert('RGB')
    d = ImageChops.difference(A, Bm).convert('L'); h = d.histogram(); bad = sum(h[24:])
    return bad / (A.width * A.height)
problems = []
with sync_playwright() as p:
    br = p.chromium.launch(args=['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
    for (W, H) in SIZES:
        tag = f'{W}x{H}'
        pg = br.new_page(viewport={'width': W, 'height': H}); errs = []
        pg.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)[:200]))
        pg.on('console', lambda m: errs.append('console.' + m.type + ': ' + m.text[:200]) if m.type == 'error' else None)
        pg.goto(URL); pg.wait_for_function("window.SHOW", timeout=15000); pg.wait_for_timeout(400)
        N = pg.evaluate("SHOW.N")
        # ١) التنقل خطوة خطوة للأمام مع حفظ الحالة، ولقطات منتصف الحركة
        fwd = []
        for i in range(N):
            if i > 0:
                pg.evaluate("SHOW.next()")
                tr = pg.evaluate(f"SHOW.beats[{i}].tr||'fly'")
                if W == 1366 and tr in ('fly', 'whip', 'push') and pg.evaluate("!!Cam.tween"):
                    dur = pg.evaluate("Cam.tween&&Cam.tween.duration?Cam.tween.duration():1")
                    pg.wait_for_timeout(int(dur * 500)); pg.screenshot(path=f'{OUT}/mid_{i:02d}_{tr}.png')
                settle(pg)
            fwd.append(state(pg))
        # ٢) الرجوع من كل ضغطة يعيد حالة السابقة
        for i in range(N - 1, 0, -1):
            pg.evaluate("SHOW.prev()"); settle(pg)
            st = state(pg)
            if st != fwd[i - 1]: problems.append(f'{tag} back {i+1}->{i}: {st} != {fwd[i-1]}')
        # ٣) القفز مباشرة يعطي الحالة نفسها، ومقارنة بكسلية مع تجميد الحركة
        pg.add_style_tag(content=FREEZE)
        for i in range(N):
            pg.evaluate(f"SHOW.go({i},'cut')"); pg.wait_for_timeout(60)
            st = state(pg)
            if st != fwd[i]: problems.append(f'{tag} jump {i+1}: {st} != {fwd[i]}')
            pg.screenshot(path=f'{OUT}/jump_{tag}_{i:02d}.png')
        pg.evaluate("SHOW.go(0,'cut')")
        for i in range(1, N):
            pg.evaluate("SHOW.next()"); settle(pg)
            pg.screenshot(path=f'{OUT}/walk_{tag}_{i:02d}.png')
            r = diff(f'{OUT}/walk_{tag}_{i:02d}.png', f'{OUT}/jump_{tag}_{i:02d}.png')
            if r > 0.002: problems.append(f'{tag} pixels walk vs jump beat {i+1}: {r:.4f}')
        if errs: problems.append(f'{tag} console: ' + ' | '.join(sorted(set(errs))[:4]))
        print(tag, 'beats', N, 'ok' if not [x for x in problems if x.startswith(tag)] else 'issues', flush=True)
        pg.close()
    br.close()
print('PROBLEMS', len(problems)); [print(' -', x) for x in problems]
sys.exit(1 if problems else 0)
