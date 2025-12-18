import Raty from 'raty-js';
import 'raty-js/src/raty.css';

export function renderStories(stories) {
  const swiperWrapper = document.querySelector('.success-stories-section .swiper-wrapper');

  const markup = stories
    .map(
      ({ description, rate, author }) =>
        `
        <div class="swiper-slide">
          <div class="star-rating" data-score="${rate}"></div>     
            <p class="storie-text">${description}</p>
            <p class="storie-names">${author}</p>  
        </div>`
    )
    .join('');

  swiperWrapper.insertAdjacentHTML('beforeend', markup);

  document.querySelectorAll('.star-rating').forEach(rating => {
    const raty = new Raty(rating, {
      starType: 'svg',
      readOnly: true,
    });
    raty.init();
  });
}
