/* ============================================================
   HOME.JS — анимации главной страницы
   Glassmorphism nav · Scroll-reveal · Счётчики цифр
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. GLASSMORPHISM NAV при скролле ─────────────────── */
  const header = document.getElementById('site-header');

  const updateNav = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ── 2. SCROLL-REVEAL (.reveal-up) ────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    /* фоллбэк для старых браузеров */
    revealEls.forEach((el) => el.classList.add('visible'));
  }


  /* ── 3. СЧЁТЧИКИ ЦИФР ─────────────────────────────────── */
  /* Элементы: <div class="stat__num" data-target="210" data-prefix="+" data-suffix="%"> */

  const statNums = document.querySelectorAll('.stat__num[data-target]');

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const prefix  = el.dataset.prefix  || '';
    const suffix  = el.dataset.suffix  || '';
    const duration = 1400; // мс
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const current  = Math.round(eased * target);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix; // точное финальное значение
      }
    };

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && statNums.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNums.forEach((el) => counterObserver.observe(el));
  }


  /* ── 4. ПЛАВНЫЙ СКРОЛЛ НАВЕРХ ─────────────────────────── */
  document.querySelectorAll('[data-scroll-top]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

})();
