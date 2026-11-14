/* show.js — محرك العرض: شرائح على مسرح 1600×900، كشف بالضغط، انتقالات سينمائية، مؤثرات، ومزامنة شاشة المعلم.
   الحالة = رقم الضغطة فقط (شريحة + مقطع)، فالرجوع والقفز يعطيان الصورة نفسها دائمًا. */
(function(){
  'use strict';
  var D = window.DECK, B = D.beats, N = B.length;
  var stage = document.getElementById('stage');
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function ar(n){ return String(n).replace(/\d/g, function(d){ return AR[d]; }); }
  if(slides.length !== D.slides.length){ console.warn('عدد الشرائح لا يطابق البيانات', slides.length, D.slides.length); }

  /* ===== المقياس ===== */
  var SC = 1;
  function fit(){
    var w = window.innerWidth, h = window.innerHeight;
    SC = Math.min(w / 1600, h / 900);
    stage.style.position = 'absolute'; stage.style.left = '50%'; stage.style.top = '50%';
    stage.style.transform = 'translate(-50%,-50%) scale(' + SC.toFixed(4) + ')';
    FX.size();
  }

  /* ===== الخلفيات ===== */
  var BG = {
    night:'radial-gradient(1100px 700px at 75% 0%,#1F3D60 0%,rgba(31,61,96,0) 60%),linear-gradient(165deg,#0F1F33,#0A1422)',
    deep:'radial-gradient(900px 600px at 50% 0%,#2A2F5E 0%,rgba(42,47,94,0) 65%),linear-gradient(170deg,#11142C,#080A18)',
    earth:'radial-gradient(1000px 650px at 80% 0%,#5A3E22 0%,rgba(90,62,34,0) 60%),linear-gradient(165deg,#2A1D12,#130D08)',
    gold:'radial-gradient(1000px 650px at 85% 0%,#6A4A14 0%,rgba(106,74,20,0) 60%),linear-gradient(165deg,#24190B,#100B05)',
    teal:'radial-gradient(1000px 650px at 85% 0%,#14584F 0%,rgba(20,88,79,0) 60%),linear-gradient(165deg,#0C2627,#071414)',
    terra:'radial-gradient(1000px 650px at 85% 0%,#6A2E1C 0%,rgba(106,46,28,0) 60%),linear-gradient(165deg,#2A140E,#120806)',
    plum:'radial-gradient(1000px 650px at 85% 0%,#4E2B60 0%,rgba(78,43,96,0) 60%),linear-gradient(165deg,#20132A,#0F0915)'
  };
  var bgA = document.getElementById('bgA'), bgB = document.getElementById('bgB'), bgFront = bgA, bgName = '';
  function setBg(name, instant){
    if(name === bgName){ return; } bgName = name;
    var back = bgFront === bgA ? bgB : bgA;
    back.style.background = BG[name] || BG.night;
    if(instant){ back.style.transition = 'none'; bgFront.style.transition = 'none'; }
    back.classList.add('on'); bgFront.classList.remove('on');
    if(instant){ void back.offsetWidth; back.style.transition = ''; bgFront.style.transition = ''; }
    bgFront = back;
  }

  /* ===== غبار عائم ===== */
  (function(){ var d = document.getElementById('dust'), h = '';
    for(var i = 0; i < 22; i++){ h += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (40 + Math.random() * 60).toFixed(1) + '%;--t:' + (14 + Math.random() * 16).toFixed(1) + 's;--dl:-' + (Math.random() * 20).toFixed(1) + 's;--x:' + (Math.random() * 80 - 40).toFixed(0) + 'px"></i>'; }
    d.innerHTML = h; })();

  /* ===== أطوال الخطوط المرسومة ===== */
  function measure(sl){
    if(sl._m){ return; } sl._m = 1;
    [].forEach.call(sl.querySelectorAll('.dr'), function(p){ try{ var L = Math.ceil(p.getTotalLength ? p.getTotalLength() : 0); if(L > 0){ p.style.setProperty('--len', L + 1); } }catch(e){} });
  }

  /* ===== تطبيق حالة شريحة ===== */
  function frags(sl, k, instant){
    sl.dataset.k = k;
    var els = [].slice.call(sl.querySelectorAll('[data-f],[data-o]'));
    if(instant){ els.forEach(function(e){ e.classList.add('instant'); }); }
    els.forEach(function(e){
      if(e.hasAttribute('data-f')){ e.classList.toggle('on', +e.getAttribute('data-f') <= k); }
      if(e.hasAttribute('data-o')){ e.classList.toggle('gone', +e.getAttribute('data-o') <= k); }
    });
    if(instant){ void sl.offsetWidth; requestAnimationFrame(function(){ requestAnimationFrame(function(){ els.forEach(function(e){ e.classList.remove('instant'); }); }); }); }
  }
  function maxF(si){ return D.slides[si].t.length - 1; }

  /* ===== الانتقالات ===== */
  var EASE = 'cubic-bezier(.7,0,.2,1)', running = [];
  function finishRunning(){ var r = running; running = []; r.forEach(function(a){ try{ a.finish(); }catch(e){} }); }
  function trans(A, Bs, type, dir){
    var dur = 950, kA = null, kB = null;
    if(type === 'slide'){
      var x = 1600 * (dir > 0 ? -1 : 1);
      kB = [{ transform:'translateX(' + x + 'px)' }, { transform:'none' }];
      kA = [{ transform:'none', opacity:1 }, { transform:'translateX(' + (-x * .35) + 'px)', opacity:0 }];
    } else if(type === 'zoom'){
      kB = [{ transform:'scale(' + (dir > 0 ? .82 : 1.18) + ')', opacity:0 }, { transform:'none', opacity:1 }];
      kA = [{ transform:'none', opacity:1 }, { transform:'scale(' + (dir > 0 ? 1.18 : .82) + ')', opacity:0 }];
    } else if(type === 'iris'){
      kB = [{ clipPath:'circle(0% at 50% 50%)' }, { clipPath:'circle(75% at 50% 50%)' }];
      kA = [{ opacity:1 }, { opacity:.2 }];
    } else if(type === 'curtain'){
      kB = [{ clipPath:dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath:'inset(0 0 0 0)' }];
      kA = [{ transform:'none' }, { transform:'translateX(' + (dir > 0 ? 260 : -260) + 'px)' }];
    } else {
      dur = 800; kB = [{ opacity:0 }, { opacity:1 }]; kA = [{ opacity:1 }, { opacity:0 }];
    }
    Bs.style.zIndex = 2; if(A){ A.style.zIndex = 1; }
    var aB = Bs.animate(kB, { duration:dur, easing:EASE });
    running.push(aB);
    if(A){ var aA = A.animate(kA, { duration:dur, easing:EASE, fill:'forwards' }); running.push(aA);
      aB.onfinish = function(){ hide(A); aA.cancel(); };
    }
  }
  function hide(sl){ sl.classList.remove('vis', 'live'); sl.style.zIndex = ''; }

  /* ===== التنقل ===== */
  var cur = -1;
  function slideEl(si){ return slides[si]; }
  function render(i, mode){
    i = Math.max(0, Math.min(N - 1, i));
    if(i === cur){ return; }
    finishRunning();
    var b = B[i], prev = cur >= 0 ? B[cur] : null, el = slideEl(b.s);
    if(prev && prev.s === b.s){
      /* داخل الشريحة نفسها */
      var fwd = i > cur && mode !== 'cut';
      frags(el, b.f, mode === 'cut');
      if(fwd){ effects(el, b.f); }
    } else {
      var old = prev ? slideEl(prev.s) : null, dir = !prev || b.s > prev.s ? 1 : -1;
      measure(el);
      el.classList.add('vis'); el.classList.remove('live');
      frags(el, b.f, true);
      void el.offsetWidth;
      el.classList.add('live');
      if(mode === 'cut' || !old){
        if(old){ hide(old); }
        if(mode === 'cut'){ el.classList.add('instant'); void el.offsetWidth; requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.classList.remove('instant'); }); }); }
      } else {
        var type = (dir > 0 ? el : old).getAttribute('data-tr') || 'fade';
        trans(old, el, type, dir);
      }
      setBg(el.getAttribute('data-bg') || 'night', mode === 'cut' || !old);
    }
    cur = i;
    ui(); broadcast();
    try{ history.replaceState(null, '', '#b' + (i + 1)); }catch(e){}
  }
  function next(){ render(cur + 1); }
  function prev(){ render(cur - 1); }

  /* ===== المؤثرات اللحظية (للتقدم فقط) ===== */
  function effects(sl, k){
    [].forEach.call(sl.querySelectorAll('[data-f="' + k + '"][data-fx]'), function(e){
      var t = e.getAttribute('data-fx');
      setTimeout(function(){
        var r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
        if(t === 'slam'){ FX.burst(x, y, 90, [214, 70, 62]); FX.burst(x, y, 40, [255, 210, 120]); shake(); }
        else { FX.burst(x, y, 60); }
      }, t === 'slam' ? 380 : 450);
    });
  }
  function shake(){
    stage.parentNode.animate([{ transform:'none' }, { transform:'translate(14px,-8px)' }, { transform:'translate(-12px,7px)' }, { transform:'translate(7px,5px)' }, { transform:'none' }], { duration:420, easing:'linear' });
  }
  var FX = (function(){
    var cv = document.getElementById('fx'), cx = cv.getContext('2d'), P = [], on = false, dpr = 1, last = 0;
    function size(){ dpr = Math.min(1.5, window.devicePixelRatio || 1); cv.width = Math.round(innerWidth * dpr); cv.height = Math.round(innerHeight * dpr); }
    function burst(x, y, n, col){
      col = col || [255, 200, 110];
      for(var i = 0; i < n; i++){ var a = Math.random() * Math.PI * 2, v = (120 + Math.random() * 420) * Math.max(.6, SC);
        P.push({ x:x, y:y, vx:Math.cos(a) * v, vy:Math.sin(a) * v - 120, l:0, m:.6 + Math.random() * .7, s:(2 + Math.random() * 4) * Math.max(.7, SC), c:col }); }
      if(!on){ on = true; last = performance.now(); requestAnimationFrame(loop); }
    }
    function loop(t){
      var dt = Math.min(.05, (t - last) / 1000); last = t;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, innerWidth, innerHeight);
      for(var i = P.length - 1; i >= 0; i--){ var p = P[i]; p.l += dt; if(p.l > p.m){ P.splice(i, 1); continue; }
        p.vy += 520 * dt; p.vx *= .985; p.x += p.vx * dt; p.y += p.vy * dt; var k = 1 - p.l / p.m;
        cx.fillStyle = 'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' + k.toFixed(3) + ')';
        cx.beginPath(); cx.arc(p.x, p.y, p.s * (.4 + k * .6), 0, 6.283); cx.fill(); }
      if(P.length){ requestAnimationFrame(loop); } else { on = false; cx.clearRect(0, 0, innerWidth, innerHeight); }
    }
    return { size:size, burst:burst };
  })();

  /* ===== الواجهة ===== */
  var track = document.getElementById('track'), segs = [];
  D.secs.forEach(function(s, k){
    var idx = []; B.forEach(function(b, i){ if(D.slides[b.s].sec === k){ idx.push(i); } });
    var el = document.createElement('button'); el.type = 'button'; el.className = 'seg'; el.style.setProperty('--w', idx.length); el.style.setProperty('--c', s.c);
    el.innerHTML = '<i><b></b></i><span>' + s.name + '</span>'; el.onclick = function(e){ e.stopPropagation(); render(idx[0], 'go'); };
    track.appendChild(el); segs.push({ el:el, a:idx[0], z:idx[idx.length - 1] });
  });
  function ui(){
    document.getElementById('cnt').textContent = ar(cur + 1) + ' / ' + ar(N);
    segs.forEach(function(s){ var p = cur >= s.z ? 1 : cur < s.a ? 0 : (cur - s.a + 1) / (s.z - s.a + 1);
      s.el.style.setProperty('--p', p.toFixed(3)); s.el.classList.toggle('cur', cur >= s.a && cur <= s.z); });
  }
  (function(){
    var days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    var months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    var d = new Date(); document.getElementById('dateTxt').textContent = days[d.getDay()] + ' ' + ar(d.getDate()) + ' ' + months[d.getMonth()] + ' ' + ar(d.getFullYear()) + 'م';
  })();

  /* ===== الإدخال ===== */
  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown'){ e.preventDefault(); next(); }
    else if(e.key === 'ArrowRight' || e.key === 'PageUp' || e.key === 'ArrowUp' || e.key === 'Backspace'){ e.preventDefault(); prev(); }
    else if(e.key === 'Home'){ render(0, 'go'); } else if(e.key === 'End'){ render(N - 1, 'go'); }
    else if(e.key === 'f' || e.key === 'F'){ fs(); }
  });
  document.getElementById('btnNext').onclick = next;
  document.getElementById('btnPrev').onclick = prev;
  document.getElementById('tapN').onclick = next;
  document.getElementById('tapP').onclick = prev;
  var tx = null, ty = null;
  document.addEventListener('touchstart', function(e){ if(e.touches.length === 1){ tx = e.touches[0].clientX; ty = e.touches[0].clientY; } }, { passive:true });
  document.addEventListener('touchend', function(e){ if(tx == null){ return; } var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty; tx = null;
    if(Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5){ if(dx > 0){ next(); } else { prev(); } } }, { passive:true });
  function fs(){ var d = document, el = d.documentElement;
    if(d.fullscreenElement || d.webkitFullscreenElement){ (d.exitFullscreen || d.webkitExitFullscreen).call(d); }
    else { var r = el.requestFullscreen || el.webkitRequestFullscreen; if(r){ try{ var p = r.call(el); if(p && p.catch){ p.catch(function(){}); } }catch(e){} } } }
  document.getElementById('btnFs').onclick = fs;
  document.getElementById('btnPr').onclick = function(){ window.open('presenter.html', 'jamal-presenter', 'width=1200,height=800'); };
  window.addEventListener('resize', fit);

  /* ===== شاشة المعلم ===== */
  var bc = null, seen = {}; try{ bc = new BroadcastChannel('jamal-lesson1'); }catch(e){}
  function broadcast(){ var m = { type:'state', i:cur, n:N, ts:Date.now() }; if(bc){ bc.postMessage(m); } try{ localStorage.setItem('jamal-lesson1-state', JSON.stringify(m)); }catch(e){} }
  function onCmd(m){ if(!m || !m.type || m.type === 'state'){ return; } if(m.id){ if(seen[m.id]){ return; } seen[m.id] = 1; }
    if(m.type === 'next'){ next(); } else if(m.type === 'prev'){ prev(); } else if(m.type === 'go'){ render(m.i, 'go'); } else if(m.type === 'hello'){ broadcast(); } }
  if(bc){ bc.onmessage = function(e){ onCmd(e.data); }; }
  window.addEventListener('storage', function(e){ if(e.key === 'jamal-lesson1-cmd' && e.newValue){ try{ onCmd(JSON.parse(e.newValue)); }catch(x){} } });
  setInterval(broadcast, 2000);

  /* ===== البدء ===== */
  fit();
  var h = /^#b(\d+)$/.exec(location.hash), start = h ? Math.max(0, Math.min(N - 1, +h[1] - 1)) : 0;
  render(start, 'go');
  window.SHOW = { N:N, next:next, prev:prev, go:function(i, mode){ render(i, mode || 'go'); }, get cur(){ return cur; }, beats:B };
})();
