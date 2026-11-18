/* M019: each line appears once as it enters the visible area.
   Without JS or for reduced motion, all items remain fully visible. */
(() => {
  const section=document.querySelector('.echo-value');
  if(!section || !('IntersectionObserver' in window)) return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches) return;
  const items=[...section.querySelectorAll('[data-echo-value-reveal]')];
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      entry.target.classList.add('echo-value-revealed');
      observer.unobserve(entry.target);
    }
  },{threshold:.03,rootMargin:'0px 0px 105px 0px'});
  for(const item of items){
    if(item.getBoundingClientRect().top < window.innerHeight+70)
      item.classList.add('echo-value-revealed');
    observer.observe(item);
  }
  section.classList.add('echo-value-ready');
  reduced.addEventListener('change',()=>{
    if(reduced.matches){
      observer.disconnect();
      section.classList.remove('echo-value-ready');
    }
  },{once:true});
})();

/* Mobile overlay guard, scoped to the comparison only. */
(() => {
  const section=document.querySelector('#valor-metodo-echo');
  if(!section || !('IntersectionObserver' in window)) return;
  const mobile=window.matchMedia('(max-width:700px)');
  const set=(visible)=>document.documentElement.classList.toggle('echo-value-viewing',mobile.matches && visible);
  const observer=new IntersectionObserver(entries=>{
    set(entries.some(entry=>entry.isIntersecting));
  },{threshold:0,rootMargin:'-30px 0px -35px 0px'});
  observer.observe(section);
  mobile.addEventListener('change',()=>{
    const r=section.getBoundingClientRect();
    set(r.bottom>35 && r.top<innerHeight-30);
  });
  addEventListener('pagehide',()=>set(false));
})();
