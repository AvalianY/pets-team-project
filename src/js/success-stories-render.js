import Raty from 'raty-js';

export function renderStories(stories) {
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  const markup = stories
    .map(
      ({ _id, description, rate, author }) =>
        `
        <div class="swiper-slide">
          <div class="rating" id="${_id}" data-rate="${rate}"></div>
          <p class="storie-text">${description}</p>
          <p class="storie-names">${author}</p>
        </div>`
    )
    .join('');

  swiperWrapper.insertAdjacentHTML('beforeend', markup);

  stories.forEach(story => {
    const ratingElement = document.getElementById(story._id);

    new Raty(document.getElementById(story._id), {
      readOnly: true,
      score: story.rate,
      starType: 'i',
    });

    const stars = ratingElement.querySelectorAll('i');
    stars.forEach(star => {
      const isFilled =
        star.classList.contains('fa-star') &&
        !star.classList.contains('fa-star-o');
      const isHalf = star.classList.contains('fa-star-half-o');

      let iconId;
      if (isFilled) {
        iconId = 'icon-star-full';
      } else if (isHalf) {
        iconId = 'icon-star-half';
      } else {
        iconId = 'icon-star-empty';
      }

      star.innerHTML = `<svg width="20" height="20"><use href="./img/icons.svg#${iconId}"></use></svg>`;
    });
  });
}
