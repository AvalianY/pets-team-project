import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

let aboutUsSwiper = null;

function updateNavigationState(swiper) {
  const prevBtn = swiper.params.navigation.prevEl;
  const nextBtn = swiper.params.navigation.nextEl;

  if (prevBtn && nextBtn) {
    prevBtn.disabled = swiper.isBeginning;
    nextBtn.disabled = swiper.isEnd;
  }
}

function initAboutUsSwiper() {
  const container = document.querySelector('.about-us-section .swiper');
  if (!container) return null;

  const swiper = new Swiper(container, {
    modules: [Navigation, Pagination],
    loop: false,
    navigation: {
      nextEl: '.swiper-controls .swiper-button-next',
      prevEl: '.swiper-controls .swiper-button-prev',
    },
    pagination: {
      el: '.swiper-controls .swiper-pagination',
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

export default aboutUsSwiper;

