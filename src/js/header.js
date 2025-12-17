// header.js

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header-burger');
  const close = document.querySelector('.header-close');
  const mobMenu = document.querySelector('.header-mob-menu');
  const headerLinks = document.querySelectorAll('.header-link');

  // mobile menu toggle
  burger.addEventListener('click', () => {
    mobMenu.classList.add('mob-menu-open');
    burger.classList.add('is-hidden');
    close.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  });

  // close mobile menu function

  const closeMobileMenu = () => {
    mobMenu.classList.remove('mob-menu-open');
    burger.classList.remove('is-hidden');
    close.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  // close mobile menu event
  close.addEventListener('click', closeMobileMenu);

  // close mobile menu on ESC key press
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobMenu.classList.contains('mob-menu-open')) {
      closeMobileMenu();
    }
  });

  // close mobile menu on clicking outside the menu container
  mobMenu.addEventListener('click', e => {
    if (!e.target.closest('.header-mob-menu-container')) {
      closeMobileMenu();
    }
  });

  // smooth scroll for header links
  headerLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');

      if (targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        if (window.innerWidth < 1440) {
          closeMobileMenu();

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

  // Smooth scroll for buttons with data-scroll attribute
  const scrollButtons = document.querySelectorAll('.header-btn[data-scroll]');
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.scroll;
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (mobMenu.classList.contains('mob-menu-open')) {
        closeMobileMenu();
      }
    });
  });

  // Close menu on resize =====
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1440) {
      closeMobileMenu();
    }
  });
});
