/* Both offer sections share one checkout flow and floating-contact guard. */
(() => {
  const offers=[...document.querySelectorAll('.offer.echo-offer-premium')];
  if (!offers.length || !('IntersectionObserver' in window)) return;
  const mobile=window.matchMedia('(max-width:700px)');
  const visible=new Set();
  const evaluate=()=>{
    if (mobile.matches) {
      for(const offer of offers){
        const r=offer.getBoundingClientRect();
        if(r.bottom>40 && r.top<window.innerHeight-45) visible.add(offer);
        else visible.delete(offer);
      }
    }
    document.documentElement.classList.toggle('echo-offer-viewing', mobile.matches && visible.size>0);
  };
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries) {
      if(entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    evaluate();
  },{threshold:0,rootMargin:'-40px 0px -45px 0px'});
  offers.forEach(offer=>observer.observe(offer));
  mobile.addEventListener('change',evaluate);
  window.addEventListener('pagehide',()=>{
    visible.clear();
    document.documentElement.classList.remove('echo-offer-viewing');
  });
})();