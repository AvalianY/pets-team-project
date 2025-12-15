const petsCategoryList = document.querySelector(".pets-category-list");
const petsList = document.querySelector(".pets-list");
const loader = document.querySelector(".loader");
export const morePetsButton = document.querySelector('.more-pets-button');


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
            </div>
            <div class="button-container animated-button ligth">
                <a class="more-pet-info" data-id="${pet._id}">Дізнатись більше</a>
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
