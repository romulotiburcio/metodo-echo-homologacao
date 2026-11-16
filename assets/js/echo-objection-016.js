/* Método ECHO™ M016: efeitos discretos uma vez quando entram na área visível.
   JS desligado, navegador incompatível ou movimento reduzido: conteúdo visível. */
(() => {
  const section = document.querySelector('.echo-objection');
  if (!section || !('IntersectionObserver' in window)) return;
  /* No celular, o WhatsApp flutuante não deve cobrir cards nem texto comercial.
     O controle original reaparece ao sair deste bloco. */
  const mobile = window.matchMedia('(max-width:700px)');
  const toggleFloat = (inView) => document.documentElement.classList.toggle(
    'echo-objection-viewing', mobile.matches && inView
  );
  const floatObserver = new IntersectionObserver(entries => {
    toggleFloat(entries.some(entry => entry.isIntersecting));
  }, {threshold:0,rootMargin:'-35px 0px -40px 0px'});
  floatObserver.observe(section);
  mobile.addEventListener('change', () => {
    const rect = section.getBoundingClientRect();
    toggleFloat(rect.bottom > 40 && rect.top < window.innerHeight - 35);
  });
  window.addEventListener('pagehide', () => toggleFloat(false));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) return;
  const elements = [...section.querySelectorAll('[data-echo-objection-reveal]')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('echo-objection-visible');
      observer.unobserve(entry.target);
    }
  }, {threshold:.06,rootMargin:'0px 0px 85px 0px'});
  for (const el of elements) {
    if (el.getBoundingClientRect().top <= window.innerHeight + 45) {
      el.classList.add('echo-objection-visible');
    }
    observer.observe(el);
  }
  section.classList.add('echo-objection-ready');
  motion.addEventListener('change', () => {
    if (motion.matches) {
      observer.disconnect();
      section.classList.remove('echo-objection-ready');
    }
  }, {once:true});
})();