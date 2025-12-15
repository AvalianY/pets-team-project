// header.js

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header-burger');
  const close = document.querySelector('.header-close');
  const mobMenu = document.querySelector('.header-mob-menu');
  const headerLinks = document.querySelectorAll('.header-link');

  // ===== MOBILE MENU TOGGLE =====
  burger.addEventListener('click', () => {
    mobMenu.classList.add('mob-menu-open');
    burger.classList.add('is-hidden');
    close.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', () => {
    mobMenu.classList.remove('mob-menu-open');
    burger.classList.remove('is-hidden');
    close.classList.remove('is-active');
    document.body.style.overflow = '';
  });

  // ===== SMOOTH SCROLL =====
  headerLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');

      if (targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        if (window.innerWidth < 1440) {
          mobMenu.classList.remove('mob-menu-open');
          burger.classList.remove('is-hidden');
          close.classList.remove('is-active');
          document.body.style.overflow = '';

          setTimeout(() => {
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 300);
        } else {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const scrollButtons = document.querySelectorAll('.header-btn[data-scroll]');
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.scroll;
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (mobMenu.classList.contains('mob-menu-open')) {
        mobMenu.classList.remove('mob-menu-open');
        burger.classList.remove('is-hidden');
        close.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close menu on resize =====
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1440) {
      mobMenu.classList.remove('mob-menu-open');
      burger.classList.remove('is-hidden');
      close.classList.remove('is-active');
    }
  });
});
