import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

let aboutUsSwiper = null;

function updateNavigationState(swiper) {
  const prevEl = swiper?.navigation?.prevEl;
  const nextEl = swiper?.navigation?.nextEl;
  const prevBtn = Array.isArray(prevEl) ? prevEl[0] : prevEl;
  const nextBtn = Array.isArray(nextEl) ? nextEl[0] : nextEl;

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

  // Prevent double-initialization (e.g., HMR) which can cause double navigation calls
  if (container.swiper) {
    try {
      container.swiper.destroy(true, true);
    } catch (e) {
      // noop
    }
  }

  // Scope navigation/pagination to this container to avoid global selector matches
  const controls = container.querySelector('.about-us-swiper-controls');
  const nextBtnEl =
    controls?.querySelector('.about-us-swiper-button-next') || null;
  const prevBtnEl =
    controls?.querySelector('.about-us-swiper-button-prev') || null;
  const paginationEl =
    controls?.querySelector('.about-us-swiper-pagination') || null;

  const swiper = new Swiper(container, {
    modules: [Navigation, Pagination],
    loop: false,
    wrapperClass: 'about-us-swiper-wrapper',
    slideClass: 'about-us-swiper-slide',
    navigation: {
      nextEl: nextBtnEl,
      prevEl: prevBtnEl,
    },
    pagination: {
      el: paginationEl,
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
      init(s) {
        updateNavigationState(s);
      },
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
