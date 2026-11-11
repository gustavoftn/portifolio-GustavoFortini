(function(){
  var btns=document.querySelectorAll('#tabs button'),items=document.querySelectorAll('#skills .skill');
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    items.forEach(function(i){i.hidden=!(b.dataset.c==='all'||i.dataset.c===b.dataset.c)});
  })});
  var sw=document.getElementById('swing'),th=.35,om=0,drag=false,lt=0,lm=0,W2=7,DMP=.9;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)th=0;
  function ang(e){var r=sw.getBoundingClientRect(),dx=e.clientX-r.left,dy=Math.max(60,e.clientY-r.top);
    return Math.max(-1.3, Math.min(1.3, Math.atan2(-dx,dy)))}
  sw.addEventListener('pointerdown',function(e){drag=true;lm=performance.now();sw.classList.add('g');sw.setPointerCapture(e.pointerId);om=0;th=ang(e);e.preventDefault()});
  sw.addEventListener('pointermove',function(e){if(!drag)return;var n=ang(e),now=performance.now(),dt=Math.max((now-lm)/1000,.008);
    var v=(n-th)/dt;om=Math.max(-14,Math.min(14,.5*om+.5*v));th=n;lm=now});
  function rel(){drag=false;sw.classList.remove('g')}
  sw.addEventListener('pointerup',rel);sw.addEventListener('pointercancel',rel);sw.addEventListener('lostpointercapture',rel);
  function step(t){var dt=Math.min((t-lt)/1000||.016,.04);lt=t;
    if(!drag){om+=(-W2*Math.sin(th)-DMP*om)*dt;th+=om*dt;if(Math.abs(th)<.0004&&Math.abs(om)<.002){th=0;om=0}}
    sw.style.transform='rotate('+th+'rad)';requestAnimationFrame(step)}
  requestAnimationFrame(step);
})();