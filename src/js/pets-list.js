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
  scrollPetsList
} from "./pets-list-render.js";

let page = 1;
let userQuery = '';
const morePetsButton = document.querySelector('.more-pets-button');
let imgObjArray = [];
const firstCategoryButton = document.querySelector('.pet-category-button.all');
firstCategoryButton.classList.add('is-deactive');
const petsCategoryList = document.querySelector('.pets-category-list');

getCategoryByQueryMaker();
getImagesByQueryMaker(userQuery, page);

petsCategoryList.addEventListener('click', e => {
    const button = e.target.closest('.pet-category-button');
    if (!button) return;

    // знайти попередню deactive
    const deactiveButton = petsCategoryList.querySelector('.pet-category-button.is-deactive');

    // якщо була — прибрати клас
    if (deactiveButton) {
        deactiveButton.classList.remove('is-deactive');
    }

    // натиснуту зробити deactive
    button.classList.add('is-deactive');
});

if (morePetsButton) {
  morePetsButton.addEventListener('click', (event) => {
    event.preventDefault();
    hideMorePetsButton();
    showLoader();
    page++;
    getImagesByQueryMaker(userQuery, page);
  });
}



/* Функції */

/* Картки */
async function getImagesByQueryMaker(userQuery, page) {
  try {
    const data = await getImagesByQuery(userQuery, page);

    if (data.animals.length === 0) {
      iziToast.info({
        message: "No animals found",
        position: "topRight",
      });
      clearPetsList();
      hideMorePetsButton();
      return;
    }

    imgObjArray = data.animals;
    createPetsList(imgObjArray);

    if (page > 1) scrollPetsList();

    const totalPages = Math.ceil(data.totalItems / data.limit);

    if (page >= totalPages) {
      hideMorePetsButton();
      iziToast.info({
        message: "You've reached the end",
      });
    } else {
      showMorePetsButton();
    }

  } catch (error) {
    iziToast.error({
      message: error.message || error,
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
}

/* Категорії */

async function getCategoryByQueryMaker() {
  try {
    const data = await getCategoryByQuery();

    if (!Array.isArray(data) || data.length === 0) {
      iziToast.info({
        message: "No categories found",
        position: "topRight",
      });
      return;
    }

    imgObjArray = data; 
    createCategoryList(imgObjArray);

  } catch (error) {
    iziToast.error({
      message: error.message || error,
      position: "topRight",
    });
  } finally {
  }
}