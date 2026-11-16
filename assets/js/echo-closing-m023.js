/* M023 — evita sobreposição do WhatsApp no encerramento mobile.
   Sem alteração de links, checkout ou comportamento em outras seções. */
(() => {
  const closing=document.querySelector('.closing.closing-premium-m023');
  if(!closing || !('IntersectionObserver' in window))return;
  const mobile=matchMedia('(max-width:700px)');
  const show=(intersect)=>document.documentElement.classList.toggle(
    'echo-closing-viewing',mobile.matches && intersect
  );
  const observer=new IntersectionObserver(entries=>{
    show(entries.some(x=>x.isIntersecting));
  },{threshold:0,rootMargin:'-30px 0px -35px 0px'});
  observer.observe(closing);
  mobile.addEventListener('change',()=>{
    const r=closing.getBoundingClientRect();
    show(r.bottom>35 && r.top<innerHeight-30);
  });
  addEventListener('pagehide',()=>show(false));
})();
