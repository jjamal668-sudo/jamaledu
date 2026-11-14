/* particles.js — سحابة نقاط WebGL مثبتة على الرسم بإحداثيات العالم
   الأنظمة: غبار عائم، ضوء يسري على مسار (الجذور، الرمل في الساعة الرملية)، شرارات (انفجار لحظي).
   كل جسيم له موضع في العالم، ويُسقط على الشاشة في كل إطار وفق الكاميرا. */
(function(){
  'use strict';
  var FX = { ok:false, flows:[], sparks:[], motes:[], active:{} };
  var gl, prog, buf, cv, dpr = 1, MAX = 2600, data = new Float32Array(MAX * 7), last = 0;

  var VS = 'attribute vec2 p; attribute float sz; attribute vec4 c; uniform vec2 res; varying vec4 vc;' +
           'void main(){ vec2 z = (p / res) * 2.0 - 1.0; gl_Position = vec4(z.x, -z.y, 0.0, 1.0); gl_PointSize = sz; vc = c; }';
  var FS = 'precision mediump float; varying vec4 vc;' +
           'void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = smoothstep(0.5, 0.0, r); a = a * a; gl_FragColor = vec4(vc.rgb * a * vc.a, a * vc.a); }';

  function sh(type, src){ var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }

  FX.init = function(canvas){
    cv = canvas;
    try{ gl = cv.getContext('webgl', { premultipliedAlpha:true, alpha:true, antialias:false }); }catch(e){ gl = null; }
    if(!gl){ return; }
    prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){ gl = null; return; }
    gl.useProgram(prog);
    buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    var st = 7 * 4;
    var ap = gl.getAttribLocation(prog, 'p'), as = gl.getAttribLocation(prog, 'sz'), ac = gl.getAttribLocation(prog, 'c');
    gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, st, 0);
    gl.enableVertexAttribArray(as); gl.vertexAttribPointer(as, 1, gl.FLOAT, false, st, 8);
    gl.enableVertexAttribArray(ac); gl.vertexAttribPointer(ac, 4, gl.FLOAT, false, st, 12);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    FX.ok = true;
    FX.resize();
    for(var i = 0; i < 110; i++){ FX.motes.push({ x:Math.random(), y:Math.random(), z:.4 + Math.random() * .6, ph:Math.random() * 6.28 }); }
    requestAnimationFrame(FX.frame);
  };
  FX.resize = function(){
    if(!cv){ return; }
    dpr = Math.min(1.5, window.devicePixelRatio || 1);
    cv.width = Math.round(cv.clientWidth * dpr); cv.height = Math.round(cv.clientHeight * dpr);
    if(gl){ gl.viewport(0, 0, cv.width, cv.height); }
  };
  /* مسار مضيء: نقاط عالمية + لون + عدد + اسم اللوحة التي يعمل فيها */
  FX.addFlow = function(o){
    var pts = o.pts, L = [0], tot = 0;
    for(var i = 1; i < pts.length; i++){ tot += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(tot); }
    var f = { pts:pts, L:L, tot:tot, key:o.key, col:o.col || [1, .85, .45], n:o.n || 40, speed:o.speed || 260, size:o.size || 9, spread:o.spread || 10, ps:[] };
    for(var k = 0; k < f.n; k++){ f.ps.push({ u:Math.random(), j:(Math.random() - .5) * 2, sp:.6 + Math.random() * .8 }); }
    FX.flows.push(f);
  };
  function along(f, u){
    var d = u * f.tot, i = 1; while(i < f.L.length - 1 && f.L[i] < d){ i++; }
    var a = f.pts[i - 1], b = f.pts[i], seg = f.L[i] - f.L[i - 1] || 1, t = (d - f.L[i - 1]) / seg;
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, b[0] - a[0], b[1] - a[1]];
  }
  /* شرارات عند نقطة في العالم */
  FX.burst = function(x, y, o){
    o = o || {}; var n = o.n || 60, col = o.col || [1, .78, .35];
    for(var i = 0; i < n; i++){
      var a = Math.random() * Math.PI * 2, v = (o.v || 520) * (.35 + Math.random() * .9);
      FX.sparks.push({ x:x, y:y, vx:Math.cos(a) * v, vy:Math.sin(a) * v - (o.up || 160), life:0, max:.7 + Math.random() * .7, col:col, size:(o.size || 12) * (.6 + Math.random() * .8) });
    }
  };
  FX.setActive = function(keys){ FX.active = {}; (keys || []).forEach(function(k){ FX.active[k] = 1; }); };

  FX.frame = function(t){
    requestAnimationFrame(FX.frame);
    if(!FX.ok || !window.Cam || !Cam.world){ return; }
    var dt = Math.min(.05, (t - (last || t)) / 1000); last = t;
    var C = Cam, s = C.s, vw = C.vw(), vh = C.vh(), ox = vw / 2 - C.cx * s, oy = vh / 2 - C.cy * s, n = 0;
    function put(x, y, size, r, g, b, a){ if(n >= MAX){ return; } var k = n * 7; data[k] = x * dpr; data[k + 1] = y * dpr; data[k + 2] = size * dpr; data[k + 3] = r; data[k + 4] = g; data[k + 5] = b; data[k + 6] = a; n++; }
    /* ١) غبار عائم في الشاشة (طبقة جوّية) */
    var drift = t / 1000;
    for(var i = 0; i < FX.motes.length; i++){
      var m = FX.motes[i];
      var x = ((m.x * vw + drift * 14 * m.z - C.cx * s * .04 * m.z) % vw + vw) % vw;
      var y = ((m.y * vh - drift * 9 * m.z + Math.sin(drift * .7 + m.ph) * 12 - C.cy * s * .04 * m.z) % vh + vh) % vh;
      put(x, y, (2.5 + 4 * m.z), 1, .93, .75, .22 + .25 * Math.abs(Math.sin(drift * .9 + m.ph)));
    }
    /* ٢) مسارات الضوء */
    for(var fi = 0; fi < FX.flows.length; fi++){
      var f = FX.flows[fi]; if(!FX.active[f.key]){ continue; }
      for(var pi = 0; pi < f.ps.length; pi++){
        var p = f.ps[pi]; p.u += dt * f.speed * p.sp / f.tot; if(p.u > 1){ p.u -= 1; }
        var q = along(f, p.u), len = Math.hypot(q[2], q[3]) || 1, nx = -q[3] / len, ny = q[2] / len;
        var wx = q[0] + nx * p.j * f.spread, wy = q[1] + ny * p.j * f.spread;
        var a = Math.sin(p.u * Math.PI);
        put(ox + wx * s, oy + wy * s, Math.max(3, f.size * s * 2.2), f.col[0], f.col[1], f.col[2], .9 * a);
      }
    }
    /* ٣) الشرارات */
    for(var si = FX.sparks.length - 1; si >= 0; si--){
      var sp = FX.sparks[si]; sp.life += dt;
      if(sp.life > sp.max){ FX.sparks.splice(si, 1); continue; }
      sp.vy += 520 * dt; sp.vx *= .985; sp.x += sp.vx * dt; sp.y += sp.vy * dt;
      var k2 = 1 - sp.life / sp.max;
      put(ox + sp.x * s, oy + sp.y * s, Math.max(3, sp.size * Math.max(.5, s * 2) * k2 + 2), sp.col[0], sp.col[1], sp.col[2], k2);
    }
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    if(!n){ return; }
    gl.uniform2f(gl.getUniformLocation(prog, 'res'), cv.width, cv.height);
    gl.bufferData(gl.ARRAY_BUFFER, data.subarray(0, n * 7), gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, n);
  };
  window.FX = FX;
})();
