// Гамбургер-меню
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.nav__mobile');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Закрываем при клике на ссылку
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// Плавный скролл наверх
document.querySelectorAll('[data-scroll-top]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
