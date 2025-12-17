// плавний скрол
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.footer-nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// стан active на лінках та disabled
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.footer-nav-link');
  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener('click', e => {
     
      if (link.classList.contains('is-disabled')) return;

           links.forEach(l => l.classList.remove('is-active'));

           link.classList.add('is-active');

            const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

         history.pushState(null, '', targetId);
    });
  });
});
