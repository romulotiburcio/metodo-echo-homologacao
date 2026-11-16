/* Missão 008: micro-revelação progressiva só nos elementos novos da seção de benefícios.
   Sem JavaScript os elementos permanecem visíveis. A classe de movimento só é ativada
   quando o navegador pode observar interseções e a pessoa não optou por reduzir movimento. */
(() => {
  const root = document.querySelector('.echo-hybrid-benefits');
  if (!root || !('IntersectionObserver' in window)) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;
  const items = [...root.querySelectorAll('[data-echo-reveal]')];
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('echo-editorial-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.06, rootMargin: '0px 0px 65px 0px' });
  for (const el of items) {
    if (el.getBoundingClientRect().top < window.innerHeight + 50) el.classList.add('echo-editorial-visible');
    observer.observe(el);
  }
  document.documentElement.classList.add('echo-editorial-motion');
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) {
      document.documentElement.classList.remove('echo-editorial-motion');
      observer.disconnect();
    }
  }, { once: true });
})();