import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const petsCategoryList = document.querySelector(".pets-category-list");
const petsList = document.querySelector(".pets-list");
const loader = document.querySelector(".loader");
const morePetsButton = document.querySelector('.more-pets-button');

const lightbox = new SimpleLightbox('.pets-list a', {
    captionsData: "alt",
    captionDelay: 250,
    });

export function createPetsList(images) {
    
    const petsListContent = images.map(img => 
        `<li class="pet-list-item">
            <a class="pet-item-link" href="${img.image}">
                <img 
                class="pet-image" 
                src="${img.image}" 
                alt="${img.shortDescription}" 
                />
            </a>
            <div class="info-container">
                <p class="pet-info species">${img.species}</p>
                <p class="pet-info name">${img.name}</p>
                <p class="pet-info category">${
                   img.categories.map(cat => `<span class="category">${cat.name}</span>`).join(' ')}
                </p>
                <p class="pet-info age-gender"><span class="age">${img.age}</span class="gender"><span>${img.gender}</span></p>
                <p class="pet-info behavior">${img.behavior} ${img.shortDescription}</p>
            </div>
            <div class="button-container animated-button ligth">
                <a class="more-pet-info" data-id="${img._id}">Дізнатись більше</a>
            </div>
        </li>`
    ).join('');

    petsList.insertAdjacentHTML("beforeend", petsListContent);
    lightbox.refresh();
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
    const firstCard = document.querySelector('.pet-list-item');
    if (!firstCard) return;

    const cardHeight = firstCard.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth"
    });
}

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
                <button class="pet-category-button animated-button dark" type="button">
                    ${cat.name}
                </button>
            </li>
        `)
        .join('');

    petsCategoryList.insertAdjacentHTML("beforeend", categoriesListContent);
}
