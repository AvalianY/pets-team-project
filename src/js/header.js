// header.js

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header-burger');
  const close = document.querySelector('.header-close');
  const mobMenu = document.querySelector('.header-mob-menu');
  const headerLinks = document.querySelectorAll('.header-link');

  // Esc handler
  const handleEscKey = e => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  };

  // close mobile menu function
  const closeMobileMenu = () => {
    if (!mobMenu.classList.contains('mob-menu-open')) return;

    mobMenu.classList.remove('mob-menu-open');
    burger.classList.remove('is-hidden');
    close.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  // open mobile menu
  burger.addEventListener('click', () => {
    mobMenu.classList.add('mob-menu-open');
    burger.classList.add('is-hidden');
    close.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  });

  // close button
  close.addEventListener('click', closeMobileMenu);

  // click outside to close
  mobMenu.addEventListener('click', e => {
    if (!e.target.closest('.header-mob-menu-container')) {
      closeMobileMenu();
    }
  });

  // smooth scroll for header links
  headerLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');

      if (!targetId || !targetId.startsWith('#')) return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      e.preventDefault();

      if (window.innerWidth < 1440) {
        closeMobileMenu();
        setTimeout(() => {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 300);
      } else {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // smooth scroll for buttons with data-scroll
  const scrollButtons = document.querySelectorAll('.header-btn[data-scroll]');
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.scroll;
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      closeMobileMenu();
    });
  });

  // close mobile menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1440) {
      closeMobileMenu();
    }
  });
});
