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

  // Reels: tocam mudos quando visíveis; o botão liga o som de um por vez
  const reels = [...document.querySelectorAll('.reel')];
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setSound = (reel, on) => {
    const video = reel.querySelector('video');
    const btn = reel.querySelector('.reel__sound');
    video.muted = !on;
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', on ? 'Desligar o som' : 'Ligar o som');
  };
  reels.forEach((reel) => {
    const video = reel.querySelector('video');
    reel.querySelector('.reel__sound').addEventListener('click', () => {
      const turnOn = video.muted;
      reels.forEach((r) => r !== reel && setSound(r, false));
      setSound(reel, turnOn);
      if (turnOn) video.play().catch(() => {});
    });
    video.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
  });
  if ('IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const video = target.querySelector('video');
        if (isIntersecting && !calm) {
          video.preload = 'auto';
          video.play().catch(() => {});
        } else if (!isIntersecting) {
          video.pause();
          setSound(target, false);
        }
      });
    }, { threshold: 0.4 });
    reels.forEach((r) => vio.observe(r));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
