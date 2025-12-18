import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

let aboutUsSwiper = null;

function updateNavigationState(swiper) {
  const prevBtn = Array.isArray(swiper.navigation?.prevEl)
    ? swiper.navigation.prevEl[0]
    : swiper.navigation?.prevEl;
  const nextBtn = Array.isArray(swiper.navigation?.nextEl)
    ? swiper.navigation.nextEl[0]
    : swiper.navigation?.nextEl;

  if (prevBtn && nextBtn) {
    prevBtn.disabled = swiper.isBeginning;
    nextBtn.disabled = swiper.isEnd;
  }
}



function initAboutUsSwiper() {
  const container = document.querySelector(
    '.about-us-section .about-us-swiper'
  );
  if (!container) return null;

  const swiper = new Swiper(container, {
    modules: [Navigation, Pagination],
    loop: false,
    wrapperClass: 'about-us-swiper-wrapper',
    slideClass: 'about-us-swiper-slide',
    navigation: {
      nextEl: '.about-us-swiper-controls .about-us-swiper-button-next',
      prevEl: '.about-us-swiper-controls .about-us-swiper-button-prev',
    },
    pagination: {
      el: '.about-us-swiper-controls .about-us-swiper-pagination',
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1280: {
        slidesPerView: 1,
      },
    },
    on: {
      slideChange() {
        updateNavigationState(swiper);
      },
    },
  });

  updateNavigationState(swiper);
  return swiper;
}

function runInit() {
  aboutUsSwiper = initAboutUsSwiper();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}

