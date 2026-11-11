/* engine.js — الضغطات، التنقل، المفاتيح، الطبقات العلوية، الربط مع شاشة المعلم */
(function(){
  'use strict';
  var D = document, B = DECK.beats, N = B.length;
  var world = D.getElementById('world'), stage = D.getElementById('stage');
  var cur = 0, overview = false, ready = false;
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function ar(n){ return String(n).replace(/\d/g, function(d){ return AR[d]; }); }
  function $(s, r){ return (r || D).querySelector(s); }
  function $$(s, r){ return Array.prototype.slice.call((r || D).querySelectorAll(s)); }

  /* ---------- هندسة العالم (مستقلة عن تحويل الكاميرا) ---------- */
  function rectOf(el){
    var x = 0, y = 0, w = el.offsetWidth, h = el.offsetHeight, e = el;
    while(e && e !== world){
      x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent;
      if(e && e !== world){ x += e.clientLeft; y += e.clientTop; }
    }
    return { x:x, y:y, w:w, h:h };
  }
  function svgRect(svg){
    /* SVG داخل عنصر HTML: نأخذ صندوق الأب ثم موضع الـSVG داخله */
    var host = svg.parentNode, r = rectOf(host), cs = getComputedStyle(svg);
    var left = parseFloat(cs.left) || 0, top = parseFloat(cs.top) || 0;
    return { x:r.x + host.clientLeft + left, y:r.y + host.clientTop + top, w:svg.clientWidth || svg.getBoundingClientRect().width / Cam.s, h:svg.clientHeight || svg.getBoundingClientRect().height / Cam.s };
  }
  function svgToWorld(svg, x, y){
    var r = svgRect(svg), vb = svg.viewBox.baseVal, par = (svg.getAttribute('preserveAspectRatio') || 'xMidYMid meet');
    var sx = r.w / vb.width, sy = r.h / vb.height, k = par.indexOf('slice') > -1 ? Math.max(sx, sy) : Math.min(sx, sy);
    var ox = r.x + (r.w - vb.width * k) / 2, oy = r.y + (r.h - vb.height * k) / 2;
    return [ox + (x - vb.x) * k, oy + (y - vb.y) * k, k];
  }
  function target(c){
    if(c === 'world'){ return { x:80, y:80, w:Cam.W - 160, h:Cam.H - 160 }; }
    if(typeof c === 'string'){ return rectOf($(c)); }
    var el = $(c.sel), b = c.box;
    if(el instanceof SVGElement){ var a = svgToWorld(el, b[0], b[1]); return { x:a[0], y:a[1], w:b[2] * a[2], h:b[3] * a[2] }; }
    var r = rectOf(el); return { x:r.x + el.clientLeft + b[0], y:r.y + el.clientTop + b[1], w:b[2], h:b[3] };
  }
  function portrait(){ return Cam.vh() > Cam.vw() * 1.15; }
  function pose(i){
    var b = B[i], c = b.cam;
    if(portrait() && b.camM){ c = b.camM; }
    var r = target(c), opt = {};
    if(b.zoom){ opt.zoom = b.zoom; }
    if(c === 'world'){ opt.max = 1; }
    return Cam.fit(r, opt);
  }

  /* ---------- الحالة التراكمية ---------- */
  function stateAt(i){
    var on = {};
    for(var k = 0; k <= i; k++){
      (B[k].add || []).forEach(function(x){ on[x] = 1; });
      (B[k].rem || []).forEach(function(x){ delete on[x]; });
    }
    return on;
  }
  function render(i){
    var on = stateAt(i), b = B[i];
    $$('[data-r]').forEach(function(el){ el.classList.toggle('on', !!on[el.getAttribute('data-r')]); });
    $$('.era').forEach(function(el){ el.classList.toggle('lit', !!on['era' + el.getAttribute('data-era')]); });
    var spot = overview ? 'all' : b.spot;
    $$('[data-panel]').forEach(function(p){ p.classList.toggle('dim', spot !== 'all' && spot.indexOf(p.getAttribute('data-panel')) < 0); });
    $$('[data-sub]').forEach(function(sb){
      var panel = sb.closest('[data-panel]'), keys = $$('[data-sub]', panel).map(function(x){ return x.getAttribute('data-sub'); });
      var focus = spot !== 'all' && keys.some(function(k){ return spot.indexOf(k) > -1; });
      sb.classList.toggle('dim', focus && spot.indexOf(sb.getAttribute('data-sub')) < 0);
    });
    D.getElementById('spot').style.opacity = (spot === 'all') ? 0 : 1;
    /* الأنظمة المضيئة النشطة */
    var act = [];
    if(spot === 'all' || spot.indexOf('roots') > -1){ act.push('roots'); }
    if(spot !== 'all' && spot.indexOf('c3') > -1){ act.push('sand'); }
    if(on.era1){ act.push('eras'); }
    FX.setActive(act);
    /* الطبقات العلوية */
    D.getElementById('cnt').textContent = ar(i + 1) + ' / ' + ar(N);
    D.getElementById('prog').style.width = ((i + 1) / N * 100) + '%';
    D.getElementById('bPrev').disabled = i === 0; D.getElementById('bNext').disabled = i === N - 1;
  }
  function playFx(i){
    (B[i].fx || []).forEach(function(f){
      var run = function(){
        if(f.k === 'shake'){ Cam.shake(20); }
        if(f.k === 'sparks'){ var el = $(f.at); if(!el){ return; } var r = rectOf(el); FX.burst(r.x + r.w / 2, r.y + r.h / 2, { n:f.n || 70, col:f.col }); }
      };
      if(f.delay){ setTimeout(run, f.delay * 1000); } else { run(); }
    });
  }

  /* ---------- التنقل ---------- */
  function go(i, how){
    i = Math.max(0, Math.min(N - 1, i));
    var prev = cur, p;
    overview = false; cur = i;
    render(i);
    p = pose(i);
    if(how === 'cut' || !ready){ Cam.set(p); }
    else if(i === prev + 1){
      var b = B[i];
      if(b.tr === 'whip'){ Cam.whip(p); }
      else if(b.tr === 'push' && b.via){ Cam.push(target(b.via), p); }
      else if(b.tr === 'cut'){ samePose(p) ? Cam.set(p) : Cam.fly(p, { dur:.9 }); }
      else { Cam.fly(p); }
      playFx(i);
    }
    else if(i === prev - 1){ samePose(p) ? Cam.set(p) : Cam.fly(p, { dur:1.1 }); }
    else { Cam.fly(p, { dur:1.2 }); }
    try{ history.replaceState(null, '', '#' + (i + 1)); }catch(e){}
    sync();
  }
  function samePose(p){ var a = Cam.get(); return Math.abs(a.cx - p.cx) < 1 && Math.abs(a.cy - p.cy) < 1 && Math.abs(a.s - p.s) / p.s < .002; }
  function next(){ if(overview){ return go(cur, 'fly'); } if(cur < N - 1){ go(cur + 1); } }
  function prev(){ if(overview){ return go(cur, 'fly'); } if(cur > 0){ go(cur - 1); } }
  function toggleOverview(){
    if(overview){ go(cur); return; }
    overview = true; render(cur);
    Cam.fly(Cam.fit(target('world'), { max:1 }), { dur:1.3 });
    toast('نظرة عامة — اضغط «التالي» للعودة');
  }

  /* ---------- شاشة المعلم ---------- */
  var bc = null; try{ bc = new BroadcastChannel('jamal-lesson1'); }catch(e){}
  function sync(){
    var msg = { type:'state', i:cur, n:N, t:Date.now() };
    if(bc){ bc.postMessage(msg); }
    try{ localStorage.setItem('jamal-lesson1-state', JSON.stringify(msg)); }catch(e){}
  }
  var seenIds = {};
  function onMsg(m){
    if(!m || !m.type){ return; }
    if(m.id){ if(seenIds[m.id]){ return; } seenIds[m.id] = 1; }
    if(m.type === 'next'){ next(); } else if(m.type === 'prev'){ prev(); } else if(m.type === 'go'){ go(m.i, Math.abs(m.i - cur) === 1 ? undefined : 'fly'); } else if(m.type === 'hello'){ sync(); }
  }
  if(bc){ bc.onmessage = function(e){ onMsg(e.data); }; }
  window.addEventListener('storage', function(e){ if(e.key === 'jamal-lesson1-cmd' && e.newValue){ try{ onMsg(JSON.parse(e.newValue)); }catch(x){} } });
  function openPresenter(){ window.open('presenter.html', 'jamal-presenter', 'width=1200,height=800'); }

  /* ---------- مفاتيح ولمس وأزرار ---------- */
  D.addEventListener('keydown', function(e){
    var k = e.key;
    if(k === 'ArrowLeft' || k === 'PageDown' || k === 'ArrowDown' || k === ' ' || k === 'Enter' || k === 'n' || k === 'N'){ e.preventDefault(); next(); }
    else if(k === 'ArrowRight' || k === 'PageUp' || k === 'ArrowUp' || k === 'Backspace' || k === 'b' || k === 'B'){ e.preventDefault(); prev(); }
    else if(k === 'Home'){ go(0, 'fly'); } else if(k === 'End'){ go(N - 1, 'fly'); }
    else if(k === 'f' || k === 'F'){ fs(); } else if(k === 'p' || k === 'P'){ openPresenter(); } else if(k === 'o' || k === 'O' || k === 'Escape'){ toggleOverview(); }
  });
  var tx = null, ty = null;
  stage.addEventListener('touchstart', function(e){ if(e.touches.length === 1){ tx = e.touches[0].clientX; ty = e.touches[0].clientY; } }, { passive:true });
  stage.addEventListener('touchend', function(e){
    if(tx === null){ return; }
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
    if(Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy)){ if(dx < 0){ next(); } else { prev(); } }
  }, { passive:true });
  /* النقر على العنصر الذي ستكشفه الضغطة التالية يتقدّم خطوة */
  stage.addEventListener('click', function(e){
    if(cur >= N - 1){ return; }
    var nb = B[cur + 1], t = e.target.closest('[data-r]');
    if(t && (nb.add || []).indexOf(t.getAttribute('data-r')) > -1){ next(); }
  });
  D.getElementById('bNext').onclick = next; D.getElementById('bPrev').onclick = prev;
  D.getElementById('bPresenter').onclick = openPresenter; D.getElementById('bOverview').onclick = toggleOverview;
  function fs(){ var el = D.documentElement; if(!D.fullscreenElement && !D.webkitFullscreenElement){ try{ (el.requestFullscreen || el.webkitRequestFullscreen || function(){}).call(el); }catch(x){} } else { (D.exitFullscreen || D.webkitExitFullscreen || function(){}).call(D); } }
  D.getElementById('bFs').onclick = fs;
  var tt = 0; function toast(s){ var t = D.getElementById('toast'); t.textContent = s; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(function(){ t.classList.remove('on'); }, 1800); }
  var rz = 0; window.addEventListener('resize', function(){ clearTimeout(rz); rz = setTimeout(function(){ FX.resize(); if(!overview){ Cam.set(pose(cur)); } }, 120); });

  /* ---------- التاريخ واليوم ---------- */
  (function(){ var d = new Date(), days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'], m = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    D.getElementById('dt').textContent = days[d.getDay()] + ' ' + ar(d.getDate()) + ' ' + m[d.getMonth()] + ' ' + ar(d.getFullYear()) + 'م'; })();

  /* ---------- الإقلاع ---------- */
  function flows(){
    var rs = $('[data-panel=roots] svg.art'), c3 = $('[data-sub=c3] svg.art');
    function W(svg, pts){ return pts.map(function(p){ var w = svgToWorld(svg, p[0], p[1]); return [w[0], w[1]]; }); }
    FX.addFlow({ key:'roots', pts:W(rs, [[720,1100],[760,930],[820,760],[860,640],[950,560],[960,430]]), col:[1, .82, .4], n:28, speed:240, size:8 });
    FX.addFlow({ key:'roots', pts:W(rs, [[1260,1100],[1220,930],[1150,760],[1110,640],[1010,560],[990,430]]), col:[1, .82, .4], n:28, speed:240, size:8 });
    FX.addFlow({ key:'roots', pts:W(rs, [[975,1110],[990,800],[975,600],[975,430]]), col:[1, .9, .55], n:24, speed:300, size:8 });
    FX.addFlow({ key:'sand', pts:W(c3, [[310,262],[310,300],[311,380],[310,452]]), col:[1, .86, .45], n:34, speed:330, size:6, spread:4 });
    FX.addFlow({ key:'eras', pts:W(c3, [[1700,690],[1260,690],[820,690],[380,690]]), col:[1, .75, .3], n:40, speed:520, size:9, spread:6 });
  }
  function boot(){
    Cam.init(world, stage);
    FX.init(D.getElementById('fx'));
    flows();
    var h = parseInt((location.hash || '').replace('#', ''), 10);
    var start = (h >= 1 && h <= N) ? h - 1 : 0;
    go(start, 'cut'); ready = true;
    D.getElementById('loading').classList.add('done');
    window.SHOW = { go:go, next:next, prev:prev, get cur(){ return cur; }, N:N, pose:pose, stateAt:stateAt, beats:B, rectOf:rectOf, target:target, overview:toggleOverview };
  }
  var fontsReady = (D.fonts && D.fonts.ready) ? D.fonts.ready : Promise.resolve();
  var imgs = $$('img').map(function(im){ return im.complete ? Promise.resolve() : new Promise(function(r){ im.onload = im.onerror = r; }); });
  Promise.all([fontsReady].concat(imgs)).then(boot, boot);
})();
