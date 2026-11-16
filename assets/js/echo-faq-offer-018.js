/* M018: accessible decorative heading transition only; FAQ native details remain functional. */
(() => {
  const faq = document.querySelector('.faq.echo-faq-premium');
  if (!faq || !('IntersectionObserver' in window)) return;
  const heading = faq.querySelector('.echo-faq-heading');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!heading || reduced.matches) return;
  const observer = new IntersectionObserver(entries=>{
    for(const entry of entries) if(entry.isIntersecting){
      heading.classList.add('echo-faq-heading-seen');
      observer.unobserve(heading);
    }
  },{rootMargin:'0px 0px 70px 0px',threshold:.08});
  observer.observe(heading);
})();