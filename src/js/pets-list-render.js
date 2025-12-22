import {
  page,
  totalPages
} from "./pets-list.js";

const ICONS_SPRITE = new URL("../img/icons.svg", import.meta.url).href;

const petsCategoryList = document.querySelector(".pets-category-list");
const petsList = document.querySelector(".pets-list");
const loader = document.querySelector(".loader");
export const petsListNavigation = document.querySelector(".pets-list-navigation");
export const morePetsButton = document.querySelector('.more-pets-button');
export const isTablet = () => mqTablet.matches;
export const mqTablet = window.matchMedia("(min-width: 768px)");

/* Категорії */

const desiredOrder = [
  "Всі",
  "Собаки",
  "Коти",
  "Кролики",
  "Гризуни",
  "Птахи",
  "Тварини з особливими потребами",
  "Терміново шукають дім"
];

export function createCategoryList(categories) {

    const sortedCategories = categories.slice().sort((a, b) => {
        return desiredOrder.indexOf(a.name) - desiredOrder.indexOf(b.name);
    });


    const categoriesListContent = sortedCategories
        .map(cat => `
            <li class="category-list-item">
                <button class="pet-category-button animated-button dark"
                    type="button"
                    data-category-id="${cat._id}">
                    ${cat.name}
                </button>
            </li>
        `)
        .join('');

    petsCategoryList.insertAdjacentHTML("beforeend", categoriesListContent);
}

/* тварини */

export function createPetsList(pets) {
    
    const petsListContent = pets.map(pet => 
        `<li class="pet-list-item">
            <div class="pet-item-link">
                <img class="pet-image" src="${pet.image}" alt="${pet.shortDescription}"/>
            </div>
            <div class="info-container">
                <p class="pet-info species">${pet.species}</p>
                <p class="pet-info name">${pet.name}</p>
                <div class="pet-info category">${
                   pet.categories.map(cat => `<span class="category">${cat.name}</span>`).join(' ')}
                </div>
                <p class="pet-info age-gender"><span class="age">${pet.age}</span class="gender"><span>${pet.gender}</span></p>
                <p class="pet-info behavior">${pet.behavior} ${pet.shortDescription}</p>
                <button type="button" class="button-container animated-button ligth" data-id="${pet._id}" arial-lebel="Дізнатись більше">Дізнатись більше</p></button>
            </div>
        </li>`
    ).join('');

    petsList.insertAdjacentHTML("beforeend", petsListContent);
}

export function clearPetsList() {
    petsList.innerHTML = "";

}

export function showLoader() {
     loader.style.display = 'block';
}

export function hideLoader() {
     loader.style.display = 'none';
}

export function hideMorePetsButton() {
    morePetsButton.style.display = 'none';
}

export function showMorePetsButton() {
    morePetsButton.style.display = 'block';
}

export function scrollPetsList() {
  requestAnimationFrame(() => {
    const firstCard = document.querySelector('.pet-list-item');
    if (!firstCard) return;
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 1, behavior: 'smooth' });
  });
}

/* пагінація */

export function renderPagination() {
  if (!petsListNavigation) return;

  if (!isTablet()) {
    petsListNavigation.hidden = true;
    return;
  }

  const items = getPaginationItems(page, totalPages);

  petsListNavigation.innerHTML = `
    <button class="pets-nav-btn back animated-nav-button ${page === 1 ? "is-deactive-nav" : ""}"
      type="button" aria-label="Попередня сторінка" ${page === 1 ? "disabled" : ""}>
      <svg aria-hidden="true" width="24" height="24">
        <use href="${ICONS_SPRITE}#icon-arrow_back"></use>
      </svg>
    </button>

    ${items
      .map((it) => {
        if (it === "dots") {
          return `<span class="pets-nav-dots" aria-hidden="true">…</span>`;
        }
        const isActive = it === page;
        return `
          <button class="pets-nav-button ${isActive ? "is-active" : ""} animated-nav-button"
            type="button"
            aria-label="Сторінка ${it}"
            ${isActive ? 'aria-current="page"' : ""}>
            ${it}
          </button>`;
      })
      .join("")}

    <button class="pets-nav-btn forward animated-nav-button ${page === totalPages ? "is-deactive-nav" : ""}"
      type="button" aria-label="Наступна сторінка" ${
        page === totalPages ? "disabled" : ""
      }>
      <svg aria-hidden="true" width="24" height="24">
        <use href="${ICONS_SPRITE}#icon-arrow_forward"></use>
      </svg>
    </button>
  `;
}

function getPaginationItems(current, total) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  let middleStart;
  let middleEnd;

  if (current <= 3) {
    middleStart = 2;
    middleEnd = 4;
  }
  else if (current >= total - 2) {
    middleStart = total - 3;
    middleEnd = total - 1;
  }
  else {
    middleStart = current - 1;
    middleEnd = current + 1;
  }

  const items = [];
  items.push(1);

  if (middleStart > 2) items.push("dots");
  for (let i = middleStart; i <= middleEnd; i++) items.push(i);
  if (middleEnd < total - 1) items.push("dots");

  items.push(total);

  return items;
}
