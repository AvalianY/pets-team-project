import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery, getCategoryByQuery } from "./pets-list-api.js";
import {
  createCategoryList,
  createPetsList,
  clearPetsList,
  showLoader,
  hideLoader,
  showMorePetsButton,
  hideMorePetsButton,
  scrollPetsList,
  morePetsButton
} from "./pets-list-render.js";

let page = 1;
let categoryId = '';
let petsObjArray = [];
const petsList = document.querySelector('.pets-list');
const petsCategoryList = document.querySelector('.pets-category-list');
const firstCategoryButton = document.querySelector('.pet-category-button.all'); 
firstCategoryButton.classList.add('is-deactive');

getCategoryByQueryMaker();
getImagesByQueryMaker(categoryId, page);

petsCategoryList.addEventListener('click', e => {
    const button = e.target.closest('.pet-category-button');
    if (!button) return;
    const deactiveButton = petsCategoryList.querySelector('.pet-category-button.is-deactive');
    if (deactiveButton) deactiveButton.classList.remove('is-deactive');
    button.classList.add('is-deactive');
    categoryId = button.dataset.categoryId || '';
    page = 1;
    hideMorePetsButton();
    clearPetsList();
    showLoader();
    getImagesByQueryMaker(categoryId, page);
});

if (morePetsButton) {
  morePetsButton.addEventListener('click', (event) => {
    event.preventDefault();
    hideMorePetsButton();
    showLoader();
    page++;
    getImagesByQueryMaker(categoryId, page);
  });
}

petsList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.pets-list-section .button-container');
    if (!btn) return;
    e.preventDefault();

    const petId = btn.dataset.id;

    window.dispatchEvent(new CustomEvent('open-animal-modal', {
        detail: { petId }
    }));
});

/* Функції */

/* Картки */
async function getImagesByQueryMaker(categoryId, page) {
    try {
        hideMorePetsButton();
        const data = await getImagesByQuery(categoryId, page);

        if (data.animals.length === 0) {
        iziToast.info({
            message: 'Тварин не знайдено за обраним фільтром.',
            position: 'topRight',
        });
        clearPetsList();
        hideMorePetsButton();
        return;
        }

        petsObjArray = data.animals;
        setPets(petsObjArray); 
        createPetsList(petsObjArray);

        if (page > 1) scrollPetsList();

        const totalPages = Math.ceil(data.totalItems / data.limit);

        if (page >= totalPages) {
        hideMorePetsButton();
        iziToast.info({
            message: 'Ви переглянули всі доступні результати.'
        });
        } else {
        showMorePetsButton();
        }

    } catch (error) {
        iziToast.error({
        message: error?.message || 'Сталася помилка під час завантаження тварин.',
        position: "topRight", });
    } finally {hideLoader();}
}

/* Категорії */

async function getCategoryByQueryMaker() {
  try {
    const data = await getCategoryByQuery();

    if (!Array.isArray(data) || data.length === 0) {
      iziToast.info({
        message: 'Категорії не знайдено.',
        position: "topRight",
      });
      return;
    }

    petsObjArray = data; 
    createCategoryList(petsObjArray);

  } catch (error) {
    iziToast.error({
      message: error?.message || 'Сталася помилка під час завантаження категорій.',
      position: "topRight",
    });
  } finally {
  }
}

/* функції для передачі данних для модалки*/

function setPets(data) {
  petsObjArray = Array.isArray(data) ? data : [];
}

export function getPets() {
  return petsObjArray;
}

export function getPetById(id) {
  return petsObjArray.find(p => p._id === id);
}
