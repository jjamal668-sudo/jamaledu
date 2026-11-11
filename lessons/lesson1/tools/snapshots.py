"""صانع لقطات النظرة العامة: لقطة لكل ضغطة في assets/thumbs + ورقة تجميعية overview.webp
يحتاج: python3 + playwright + Pillow. التشغيل عبر tools/snapshots.sh
"""
import os, sys
from playwright.sync_api import sync_playwright
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
URL = os.environ.get('SHOW_URL', 'http://localhost:8766/lessons/lesson1/index.html')
OUT = os.path.join(ROOT, 'assets', 'thumbs'); os.makedirs(OUT, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(args=['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
    pg = b.new_page(viewport={'width': 1366, 'height': 768})
    pg.goto(URL); pg.wait_for_function('window.SHOW', timeout=15000); pg.wait_for_timeout(500)
    pg.add_style_tag(content='.hud,.prog,#toast{display:none!important}')
    N = pg.evaluate('SHOW.N'); files = []
    for i in range(N):
        pg.evaluate(f"SHOW.go({i},'cut')"); pg.wait_for_timeout(700)
        raw = os.path.join(OUT, f'_tmp.png'); pg.screenshot(path=raw)
        f = os.path.join(OUT, f'beat-{i+1:02d}.webp'); Image.open(raw).resize((480, 270), Image.LANCZOS).save(f, 'WEBP', quality=72); files.append(f)
    os.remove(raw); b.close()
cols = 6; rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * 480, rows * 270), (227, 206, 162))
for k, f in enumerate(files): sheet.paste(Image.open(f), ((k % cols) * 480, (k // cols) * 270))
sheet.save(os.path.join(OUT, 'overview.webp'), 'WEBP', quality=70)
print('snapshots:', len(files))
