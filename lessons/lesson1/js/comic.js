/* comic.js — كاميرا «القصة المصوّرة»
   الكاميرا = مركز في إحداثيات العالم (cx,cy) + مقياس s.
   الطيران بين لقطتين يتبع منحنى «التكبير والتحريك الأمثل» (van Wijk & Nuij):
   التكبير يُستَوفى على مقياس لوغاريتمي، فيبدو الإحساس بالسرعة متساويًا في كل الارتفاعات. */
(function(){
  'use strict';
  var RHO = Math.SQRT2, RHO2 = 2, RHO4 = 4;
  function cosh(x){ return ((x = Math.exp(x)) + 1 / x) / 2; }
  function sinh(x){ return ((x = Math.exp(x)) - 1 / x) / 2; }
  function tanh(x){ return ((x = Math.exp(2 * x)) - 1) / (x + 1); }

  /* p = [cx, cy, w]  (w = عرض المنطقة المرئية بوحدات العالم) */
  function zoomPath(p0, p1){
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2];
    var dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, f, S;
    if(d2 < 1e-6){
      S = Math.log(w1 / w0) / RHO;
      f = function(t){ return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(RHO * t * S)]; };
    } else {
      var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + RHO4 * d2) / (2 * w0 * RHO2 * d1),
        b1 = (w1 * w1 - w0 * w0 - RHO4 * d2) / (2 * w1 * RHO2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / RHO;
      f = function(t){
        var s = t * S, c0 = cosh(r0), u = w0 / (RHO2 * d1) * (c0 * tanh(RHO * s + r0) - sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * c0 / cosh(RHO * s + r0)];
      };
    }
    f.len = Math.abs(S);
    return f;
  }

  /* منحنيات التسارع (مكافئة لـ GSAP) */
  function eIn(p, n){ return Math.pow(p, n); }
  function eOut(p, n){ return 1 - Math.pow(1 - p, n); }
  function eInOut(p, n){ return p < .5 ? Math.pow(2 * p, n) / 2 : 1 - Math.pow(2 * (1 - p), n) / 2; }

  /* الحركة تُنفَّذ على طبقة المُركِّب (Web Animations) فلا تُعاد رسمة العالم في كل إطار؛
     وحالة الكاميرا (cx,cy,s) تُحسب في JS بالدالة نفسها لتتبعها المؤثرات والجسيمات. */
  var Cam = {
    world:null, stage:null, mb:null, flash:null,
    cx:6320, cy:2215, s:0.1,
    W:12640, H:4430,
    tween:null,
    listeners:[],
    init:function(world, stage){
      this.world = world; this.stage = stage;
      this.mb = document.getElementById('motionblur');
      var fl = document.createElement('div'); fl.style.cssText = 'position:absolute;inset:0;background:#FFF6DC;opacity:0;pointer-events:none;z-index:6';
      stage.appendChild(fl); this.flash = fl;
      this.apply();
    },
    vw:function(){ return this.stage.clientWidth; },
    vh:function(){ return this.stage.clientHeight; },
    onMove:function(fn){ this.listeners.push(fn); },
    tf:function(cx, cy, s){
      var tx = this.vw() / 2 - cx * s, ty = this.vh() / 2 - cy * s;
      return 'translate3d(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px,0) scale(' + s.toFixed(5) + ')';
    },
    notify:function(){ for(var i = 0; i < this.listeners.length; i++){ this.listeners[i](this); } },
    apply:function(){ this.world.style.transform = this.tf(this.cx, this.cy, this.s); this.notify(); },
    fit:function(r, opt){
      opt = opt || {};
      var vw = this.vw(), vh = this.vh();
      var padT = opt.padT != null ? opt.padT : Math.max(64, vh * .09), padB = opt.padB != null ? opt.padB : Math.max(70, vh * .1), padX = opt.padX != null ? opt.padX : Math.max(24, vw * .03);
      var aw = Math.max(50, vw - padX * 2), ah = Math.max(50, vh - padT - padB);
      var s = Math.min(aw / r.w, ah / r.h) * (opt.zoom || 1);
      s = Math.min(s, opt.max || 4);
      var cy = r.y + r.h / 2 - (padT - padB) / 2 / s;
      return { cx:r.x + r.w / 2, cy:cy, s:s };
    },
    get:function(){ return { cx:this.cx, cy:this.cy, s:this.s }; },
    set:function(p){ this.kill(); this.cx = p.cx; this.cy = p.cy; this.s = p.s; this.apply(); },
    kill:function(){
      var t = this.tween; if(!t){ return; }
      this.tween = null; t.stop();
    },
    /* محرّك عام: f(u) ترجع حالة الكاميرا عند نسبة الزمن u∈[0,1] (بعد التسارع) */
    run:function(f, dur, opt, extra){
      var self = this, KF = Math.max(24, Math.round(dur * 40)), frames = [], i;
      for(i = 0; i <= KF; i++){ var q = f(i / KF); frames.push({ offset:i / KF, transform:this.tf(q[0], q[1], q[2]), easing:'linear' }); }
      /* القفزات الحادة (مثل الدخول من النافذة) تُعرّف كإطارين بالنسبة نفسها */
      if(opt && opt.jumps){ frames = opt.jumps(frames, KF); }
      var w = this.world; w.classList.add('flying');
      var anim = w.animate(frames, { duration:dur * 1000, easing:'linear', fill:'forwards' });
      var extras = (extra || []).map(function(x){ return x.el.animate(x.kf, { duration:dur * 1000, easing:'linear', fill:'forwards' }); });
      var raf = 0, done = false;
      function stateAt(){ var ct = anim.currentTime; var u = Math.min(1, Math.max(0, (ct == null ? 0 : ct) / (dur * 1000))); var q = f(u); self.cx = q[0]; self.cy = q[1]; self.s = q[2]; }
      function tick(){ if(done){ return; } stateAt(); self.notify(); raf = requestAnimationFrame(tick); }
      raf = requestAnimationFrame(tick);
      var tw = {
        duration:function(){ return dur; },
        stop:function(){ if(done){ return; } done = true; cancelAnimationFrame(raf); stateAt();
          w.style.transform = self.tf(self.cx, self.cy, self.s); anim.cancel(); extras.forEach(function(a){ a.cancel(); });
          w.classList.remove('flying'); self.notify(); },
        finish:function(p){ if(done){ return; } done = true; cancelAnimationFrame(raf);
          self.cx = p.cx; self.cy = p.cy; self.s = p.s; w.style.transform = self.tf(p.cx, p.cy, p.s); anim.cancel(); extras.forEach(function(a){ a.cancel(); });
          requestAnimationFrame(function(){ if(!self.tween){ w.classList.remove('flying'); } }); self.notify(); }
      };
      this.tween = tw;
      anim.onfinish = function(){ if(self.tween === tw){ self.tween = null; } tw.finish(opt.end); if(opt.done){ opt.done(); } };
      return dur;
    },
    /* طيران ناعم على مسار التكبير الأمثل */
    fly:function(p, opt){
      opt = opt || {}; this.kill();
      var vw = this.vw(), path = zoomPath([this.cx, this.cy, vw / this.s], [p.cx, p.cy, vw / p.s]);
      var dur = opt.dur || Math.max(.9, Math.min(2.3, .55 + path.len * .55));
      var ease = opt.ease === 'out' ? function(u){ return eOut(u, 3); } : function(u){ return eInOut(u, 3); };
      return this.run(function(u){ var q = path(ease(u)); return [q[0], q[1], vw / q[2]]; }, dur, { end:p, done:opt.done });
    },
    /* لفّة سريعة مع ضبابية حركة */
    whip:function(p, opt){
      opt = opt || {}; this.kill();
      var x0 = this.cx, y0 = this.cy, l0 = Math.log(this.s), l1 = Math.log(p.s), dur = opt.dur || .62;
      var ang = Math.atan2(p.cy - y0, p.cx - x0) * 180 / Math.PI;
      this.mb.style.setProperty('--mb-angle', (ang + 90) + 'deg');
      var f = function(u){ var t = eInOut(u, 5), k = Math.sin(Math.PI * t); return [x0 + (p.cx - x0) * t, y0 + (p.cy - y0) * t, Math.exp(l0 + (l1 - l0) * t - .22 * k)]; };
      var mbk = []; for(var i = 0; i <= 12; i++){ mbk.push({ offset:i / 12, opacity:(Math.sin(Math.PI * eInOut(i / 12, 5)) * .85).toFixed(3) }); }
      return this.run(f, dur, { end:p, done:opt.done }, [{ el:this.mb, kf:mbk }]);
    },
    /* الدخول من «نافذة» في الرسم */
    push:function(win, p, opt){
      opt = opt || {}; this.kill();
      var vw = this.vw(), vh = this.vh(), a = this.get();
      var sIn = Math.max(vw / win.w, vh / win.h) * 1.7;
      var into = { cx:win.x + win.w / 2, cy:win.y + win.h / 2, s:sIn };
      var path = zoomPath([a.cx, a.cy, vw / a.s], [into.cx, into.cy, vw / into.s]);
      var T1 = 1.05, T2 = .95, dur = T1 + T2, cutU = T1 / dur, s0 = Math.log(p.s * 2.6), s1 = Math.log(p.s);
      var f = function(u){
        if(u < cutU){ var q = path(eIn(u / cutU, 3)); return [q[0], q[1], vw / q[2]]; }
        var v = eOut((u - cutU) / (1 - cutU), 4); return [p.cx, p.cy, Math.exp(s0 + (s1 - s0) * v)];
      };
      var jumps = function(fr, KF){
        /* إطار حاد عند لحظة القص: آخر لقطة للنافذة ثم أول لقطة للمشهد الجديد في النسبة نفسها */
        var out = fr.filter(function(k){ return Math.abs(k.offset - cutU) > 1e-6; });
        var A = f(cutU - 1e-6), Bq = f(cutU);
        out.push({ offset:cutU, transform:Cam.tf(A[0], A[1], A[2]), easing:'linear' }, { offset:cutU, transform:Cam.tf(Bq[0], Bq[1], Bq[2]), easing:'linear' });
        out.sort(function(x, y){ return x.offset - y.offset; });
        return out;
      };
      var fl = [{ offset:0, opacity:0 }, { offset:(T1 - .16) / dur, opacity:0 }, { offset:cutU, opacity:1 }, { offset:(T1 + .45) / dur, opacity:0 }, { offset:1, opacity:0 }];
      this.run(f, dur, { end:p, done:opt.done, jumps:jumps }, [{ el:this.flash, kf:fl }]);
      return dur;
    },
    shake:function(amp){
      var st = this.stage; amp = amp || 18;
      st.animate([{ transform:'translate(0,0)' }, { transform:'translate(' + amp + 'px,' + (-amp * .6) + 'px)' }, { transform:'translate(' + (-amp * .8) + 'px,' + (amp * .5) + 'px)' },
        { transform:'translate(' + (amp * .5) + 'px,' + (amp * .4) + 'px)' }, { transform:'translate(' + (-amp * .3) + 'px,' + (-amp * .2) + 'px)' }, { transform:'translate(0,0)' }], { duration:500, easing:'linear' });
    }
  };
  window.Cam = Cam;
  window.zoomPath = zoomPath;
})();
