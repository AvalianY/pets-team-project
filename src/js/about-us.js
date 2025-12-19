import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

let aboutUsSwiper = null;

function updateNavigationState(swiper) {
  // Attempt to find prev/next buttons from provided swiper or DOM
  // Keep this function robust in case Swiper's navigation option is not used
  let prevBtn = null;
  let nextBtn = null;

  // If Swiper exposed navigation elements, prefer them
  const navPrev = swiper?.navigation?.prevEl;
  const navNext = swiper?.navigation?.nextEl;
  if (navPrev) prevBtn = Array.isArray(navPrev) ? navPrev[0] : navPrev;
  if (navNext) nextBtn = Array.isArray(navNext) ? navNext[0] : navNext;

  // If not found, try to query inside swiper root element
  const root = swiper?.el || swiper?.$el || null;
  if (root && root.querySelector) {
    prevBtn = prevBtn || root.querySelector('.about-us-swiper-button-prev');
    nextBtn = nextBtn || root.querySelector('.about-us-swiper-button-next');
  }

  // Toggle disabled state and aria/class for both buttons if present
  if (prevBtn) {
    const disabled = !!swiper?.isBeginning;
    prevBtn.disabled = disabled;
    prevBtn.classList.toggle('swiper-button-disabled', disabled);
    prevBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  }
  if (nextBtn) {
    const disabled = !!swiper?.isEnd;
    nextBtn.disabled = disabled;
    nextBtn.classList.toggle('swiper-button-disabled', disabled);
    nextBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
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
    // Do not let Swiper attach navigation handlers automatically —
    // we'll wire our own handlers to avoid duplicate/stacked listeners
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
        updateNavigationState(s, prevBtnEl, nextBtnEl);
      },
      slideChange() {
        updateNavigationState(swiper, prevBtnEl, nextBtnEl);
      },
    },
  });

  // Attach single custom handlers and keep references to remove later
  const addNavHandler = (btnEl, handlerName, fn) => {
    if (!btnEl) return;
    // remove previous handler if exists
    const prev = btnEl[handlerName];
    if (prev) {
      try {
        btnEl.removeEventListener('click', prev);
      } catch (e) {
        // noop
      }
    }
    btnEl[handlerName] = fn;
    btnEl.addEventListener('click', fn);
  };

  addNavHandler(nextBtnEl, '_aboutUsNext', (e) => {
    e.preventDefault();
    swiper.slideNext();
    updateNavigationState(swiper, prevBtnEl, nextBtnEl);
  });

  addNavHandler(prevBtnEl, '_aboutUsPrev', (e) => {
    e.preventDefault();
    swiper.slidePrev();
    updateNavigationState(swiper, prevBtnEl, nextBtnEl);
  });

  updateNavigationState(swiper, prevBtnEl, nextBtnEl);
  return swiper;
}

function runInit() {
  // Destroy previous instance if present to avoid duplicate event handlers
  if (aboutUsSwiper) {
    try {
      aboutUsSwiper.destroy(true, true);
    } catch (e) {
      // noop
    }
    aboutUsSwiper = null;
  }

  aboutUsSwiper = initAboutUsSwiper();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}
