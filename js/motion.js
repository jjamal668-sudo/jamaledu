/* طبقة الحركة — GSAP + ScrollTrigger + SplitText + Lenis (محلية، تعمل بدون إنترنت) */
(function(){
  var root=document.documentElement;
  function done(){ root.classList.remove('gm-pre'); }
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!window.gsap||!window.ScrollTrigger){ done(); return; }
  var lite=root.classList.contains('gp-lite');
  var fine=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
  gsap.registerPlugin(ScrollTrigger); if(window.SplitText) gsap.registerPlugin(SplitText);
  root.classList.add('gm-on');

  /* ---------- التمرير الناعم (Lenis) ---------- */
  var lenis=null;
  if(window.Lenis&&!lite){
    try{
      lenis=new Lenis({ lerp:.095, wheelMultiplier:.95, smoothWheel:true, autoRaf:false });
      lenis.on('scroll',ScrollTrigger.update);
      gsap.ticker.add(function(t){ lenis.raf(t*1000); });
      gsap.ticker.lagSmoothing(0);
      document.querySelectorAll('.gp-results').forEach(function(e){ e.setAttribute('data-lenis-prevent',''); });
    }catch(e){ lenis=null; }
  }

  /* ---------- شريط تقدّم التمرير ---------- */
  var bar=document.createElement('div'); bar.className='gm-progress'; bar.setAttribute('aria-hidden','true'); document.body.appendChild(bar);
  gsap.set(bar,{scaleX:0});
  gsap.to(bar,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});

  /* ---------- حركة ظهور البطاقات عند التمرير ---------- */
  var SEL='.bento .card, .lesson-card, .gcard, .qz-lesson, .qz-hero, .ct-card';
  var queue=[], qt=null;
  function flush(){
    var els=queue.splice(0); qt=null; if(!els.length) return;
    /* حركة خفيفة: إزاحة + شفافية فقط (بدون blur/scale) وتتابع قصير */
    gsap.fromTo(els,{y:24,opacity:0},
      {y:0,opacity:1,duration:.5,ease:'power2.out',stagger:{amount:Math.min(.3,els.length*.04)},overwrite:'auto',
       onComplete:function(){ gsap.set(els,{clearProps:'transform,opacity'}); els.forEach(function(e){ e.classList.remove('gm-pre-el'); }); }});
  }
  var rt=null;
  function refreshSoon(){ clearTimeout(rt); rt=setTimeout(function(){ ScrollTrigger.refresh(); },160); }
  function arm(){
    var n=0;
    document.querySelectorAll(SEL).forEach(function(el){
      if(el.dataset.gm||!el.offsetParent) return;
      el.dataset.gm='1'; el.classList.add('gm-pre-el'); n++;
      ScrollTrigger.create({trigger:el,start:'top 96%',once:true,onEnter:function(){ queue.push(el); if(!qt) qt=setTimeout(flush,30); }});
    });
    done(); if(n) refreshSoon();
  }

  /* ---------- العنوان كلمةً كلمة ---------- */
  var heroSplit=null, heroDone=false;
  function hero(){
    var h=document.querySelector('#view-home .hm-title'); if(!h||!window.SplitText||heroDone) return;
    heroDone=true; /* مرة واحدة فقط: لا تُعاد الحركة كلما رجع الزائر للرئيسية */
    heroSplit=new SplitText(h,{type:'words',wordsClass:'gm-w'});
    gsap.from(heroSplit.words,{y:30,opacity:0,filter:fine?'blur(8px)':'blur(0px)',duration:.85,ease:'power3.out',stagger:.08,delay:.08,clearProps:'filter,transform,opacity'});
    gsap.from('#view-home .hm-copy > :not(.hm-title)',{y:18,opacity:0,duration:.7,ease:'power3.out',stagger:.1,delay:.4,clearProps:'transform,opacity'});
  }

  /* ---------- أزرار تنجذب للمؤشر ---------- */
  function magnet(el,k){
    var o={x:0,y:0}; function ap(){ el.style.translate=o.x.toFixed(2)+'px '+o.y.toFixed(2)+'px'; }
    el.addEventListener('pointermove',function(e){ var r=el.getBoundingClientRect(); gsap.to(o,{x:(e.clientX-r.left-r.width/2)*k,y:(e.clientY-r.top-r.height/2)*k,duration:.35,ease:'power3.out',onUpdate:ap,overwrite:true}); });
    el.addEventListener('pointerleave',function(){ gsap.to(o,{x:0,y:0,duration:.8,ease:'elastic.out(1,.45)',onUpdate:ap,overwrite:true}); });
  }
  if(fine&&!lite){ document.querySelectorAll('.hdr-tools .hbtn, .gp-btn, .brand .logo').forEach(function(e){ magnet(e,.28); }); }

  /* ---------- بارالاكس خفيف للخلفية ---------- */
  var au=document.querySelector('.gp-aurora');
  if(au&&!lite) gsap.to(au,{yPercent:-7,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.8}});

  /* ---------- ربط التنقّل بين الأقسام والتبويبات ---------- */
  var sv=window.showView;
  if(typeof sv==='function'){
    window.showView=function(id){
      var before=document.querySelector('.view.active');
      sv.apply(this,arguments);
      if(document.querySelector('.view.active')===before) return; /* لم يتغيّر القسم: لا حركة ولا قفز */
      if(lenis) lenis.scrollTo(0,{immediate:true,force:true}); /* قفزة فورية: القسم الجديد يظهر من أعلاه مباشرة */
      setTimeout(function(){ arm(); if(id==='home') hero(); },30);
    };
  }
  document.addEventListener('click',function(e){ if(e.target.closest&&e.target.closest('.tab-btn,.unit-tab-btn,.sub-tab-btn,.qz-lesson,.gp-btn')) setTimeout(arm,60); },true);
  var mt=null; new MutationObserver(function(){ clearTimeout(mt); mt=setTimeout(arm,120); }).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});

  hero(); arm();
  setTimeout(done,3500); /* شبكة أمان */
  window.addEventListener('load',function(){ ScrollTrigger.refresh(); });
})();
