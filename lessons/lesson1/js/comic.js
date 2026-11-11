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
    apply:function(){
      var vw = this.vw(), vh = this.vh();
      var tx = vw / 2 - this.cx * this.s, ty = vh / 2 - this.cy * this.s;
      this.world.style.transform = 'translate3d(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px,0) scale(' + this.s.toFixed(5) + ')';
      for(var i = 0; i < this.listeners.length; i++){ this.listeners[i](this); }
    },
    /* لقطة تناسب مستطيلًا من العالم مع هامش للطبقات العلوية */
    fit:function(r, opt){
      opt = opt || {};
      var vw = this.vw(), vh = this.vh();
      var padT = opt.padT != null ? opt.padT : Math.max(64, vh * .09), padB = opt.padB != null ? opt.padB : Math.max(70, vh * .1), padX = opt.padX != null ? opt.padX : Math.max(24, vw * .03);
      var aw = Math.max(50, vw - padX * 2), ah = Math.max(50, vh - padT - padB);
      var s = Math.min(aw / r.w, ah / r.h) * (opt.zoom || 1);
      s = Math.min(s, opt.max || 4);
      /* إزاحة رأسية لتوسيط المنطقة بين الهامشين */
      var cy = r.y + r.h / 2 - (padT - padB) / 2 / s;
      return { cx:r.x + r.w / 2, cy:cy, s:s };
    },
    get:function(){ return { cx:this.cx, cy:this.cy, s:this.s }; },
    set:function(p){ this.kill(); this.cx = p.cx; this.cy = p.cy; this.s = p.s;
      if(this.world.classList.contains('flying')){ this.world.classList.remove('flying'); /* إعادة رسم حادة بعد الحركة (تجنب بقايا التخزين المؤقت للطبقة) */ var w = this.world; w.style.display = 'none'; void w.offsetHeight; w.style.display = ''; }
      this.apply(); },
    kill:function(){ if(this.tween){ this.tween.kill(); this.tween = null; } if(this.mb){ this.mb.style.opacity = 0; } },
    /* طيران ناعم */
    fly:function(p, opt){
      opt = opt || {};
      var self = this; this.kill();
      var vw = this.vw();
      var path = zoomPath([this.cx, this.cy, vw / this.s], [p.cx, p.cy, vw / p.s]);
      var dur = opt.dur || Math.max(.9, Math.min(2.3, .55 + path.len * .55));
      var o = { t:0 };
      this.world.classList.add('flying');
      this.tween = gsap.to(o, { t:1, duration:dur, ease:opt.ease || 'power2.inOut',
        onUpdate:function(){ var q = path(o.t); self.cx = q[0]; self.cy = q[1]; self.s = vw / q[2]; self.apply(); },
        onComplete:function(){ self.set(p); if(opt.done){ opt.done(); } } });
      return dur;
    },
    /* لفّة سريعة (whip-pan) مع ضبابية حركة */
    whip:function(p, opt){
      opt = opt || {};
      var self = this; this.kill();
      var vw = this.vw(), x0 = this.cx, y0 = this.cy, l0 = Math.log(this.s), l1 = Math.log(p.s);
      var ang = Math.atan2(p.cy - y0, p.cx - x0) * 180 / Math.PI;
      this.mb.style.setProperty('--mb-angle', (ang + 90) + 'deg');
      var o = { t:0 }, dur = opt.dur || .62;
      this.world.classList.add('flying');
      this.tween = gsap.to(o, { t:1, duration:dur, ease:'power4.inOut',
        onUpdate:function(){
          var t = o.t, k = Math.sin(Math.PI * t);
          self.cx = x0 + (p.cx - x0) * t; self.cy = y0 + (p.cy - y0) * t;
          self.s = Math.exp(l0 + (l1 - l0) * t - .22 * k);
          self.mb.style.opacity = (k * .85).toFixed(3);
          self.apply();
        },
        onComplete:function(){ self.mb.style.opacity = 0; self.set(p); if(opt.done){ opt.done(); } } });
      return dur;
    },
    /* الدخول من «نافذة» في الرسم: نقترب حتى تملأ النافذة الشاشة، ثم نخرج في اللقطة الجديدة */
    push:function(win, p, opt){
      opt = opt || {};
      var self = this; this.kill();
      var vw = this.vw(), vh = this.vh();
      var sIn = Math.max(vw / win.w, vh / win.h) * 1.7;
      var into = { cx:win.x + win.w / 2, cy:win.y + win.h / 2, s:sIn };
      var tl = gsap.timeline({ onComplete:function(){ self.set(p); self.tween = null; if(opt.done){ opt.done(); } } });
      var o = { t:0 }, a = this.get(), path = zoomPath([a.cx, a.cy, vw / a.s], [into.cx, into.cy, vw / into.s]);
      this.world.classList.add('flying');
      tl.to(o, { t:1, duration:1.05, ease:'power2.in', onUpdate:function(){ var q = path(o.t); self.cx = q[0]; self.cy = q[1]; self.s = vw / q[2]; self.apply(); } });
      tl.to(this.flash, { opacity:1, duration:.16, ease:'none' }, '-=.16');
      tl.add(function(){ self.cx = p.cx; self.cy = p.cy; self.s = p.s * 2.6; self.apply(); });
      var o2 = { t:0 };
      tl.to(o2, { t:1, duration:.95, ease:'power3.out', onUpdate:function(){ self.s = Math.exp(Math.log(p.s * 2.6) + (Math.log(p.s) - Math.log(p.s * 2.6)) * o2.t); self.apply(); } });
      tl.to(this.flash, { opacity:0, duration:.45, ease:'power1.out' }, '<');
      this.tween = tl;
      return 2.2;
    },
    /* اهتزاز الكاميرا (لا يغيّر لقطة الحالة) */
    shake:function(amp){
      var st = this.stage; amp = amp || 18;
      gsap.fromTo(st, { x:0, y:0 }, { duration:.5, ease:'none', keyframes:[
        { x:amp, y:-amp * .6 }, { x:-amp * .8, y:amp * .5 }, { x:amp * .5, y:amp * .4 }, { x:-amp * .3, y:-amp * .2 }, { x:0, y:0 } ],
        onComplete:function(){ gsap.set(st, { clearProps:'transform' }); } });
    }
  };
  window.Cam = Cam;
  window.zoomPath = zoomPath;
})();
