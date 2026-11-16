/* Método ECHO™ | Missão 014: ativa e pausa apenas quando o bloco está visível.
 * Sem JS, sem IntersectionObserver ou com movimento reduzido, a timeline fica estática.
 * Não controla links, formulários, áudio, dados nem conteúdo comercial.
 */
(() => {
  const section = document.querySelector('.process.echo-process-animated');
  if (!section) return;
  const items = [...section.querySelectorAll('.steps > .step')];
  if (items.length !== 4 || !('IntersectionObserver' in window)) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let running = false;
  let queue = [];
  const later = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    queue.push(id);
  };
  function clearSequence() {
    queue.forEach(window.clearTimeout);
    queue = [];
    running = false;
    section.classList.remove('echo-process-running');
    items.forEach(el => el.classList.remove('is-lit', 'is-traveling'));
  }
  function illuminate(i) {
    if (!running) return;
    queue = [];
    items.forEach(el => el.classList.remove('is-lit', 'is-traveling'));
    const item = items[i];
    item.classList.add('is-lit');
    if (i < 3) {
      later(() => { if (running) item.classList.add('is-traveling'); }, 710);
      later(() => illuminate(i + 1), 2490);
    } else {
      later(() => illuminate(0), 2450);
    }
  }
  function evaluate() {
    const shouldRun = visible && !document.hidden && !preference.matches;
    if (!shouldRun && running) clearSequence();
    if (shouldRun && !running) {
      running = true;
      section.classList.add('echo-process-running');
      illuminate(0);
    }
  }
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(e => e.isIntersecting);
    evaluate();
  }, { rootMargin:'70px 0px 70px 0px', threshold:0.05 });
  observer.observe(section);
  document.addEventListener('visibilitychange', evaluate);
  preference.addEventListener('change', evaluate);
  window.addEventListener('pagehide', clearSequence);
})();