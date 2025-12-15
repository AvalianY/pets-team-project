const mobMenu = document.querySelector('.header-mob-menu');
const burger = document.querySelector('.header-burger');
const close = document.querySelector('.header-close');

burger.addEventListener('click', () => {
  mobMenu.classList.add('mob-menu-open');
  burger.classList.add('is-hidden');
  close.classList.add('is-active');
});

close.addEventListener('click', () => {
  mobMenu.classList.remove('mob-menu-open');
  close.classList.remove('is-active');
  burger.classList.remove('is-hidden');
});
