// Lis Óptica — nav, menu mobile, botão de WhatsApp e reveal
(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');
  const fab = document.querySelector('.fab');
  const hero = document.querySelector('.hero');

  // Nav ganha fundo ao rolar
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 24);
    fab.classList.toggle('is-on', y > hero.offsetHeight * 0.7);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Reveal ao entrar na tela
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-in'));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
