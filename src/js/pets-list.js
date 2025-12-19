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
let totalPages = 1;
let categoryId = '';
let petsObjArray = [];
const petsListNavigation = document.querySelector('.pets-list-navigation');
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

document.querySelector(".pets-list-navigation").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.classList.contains("pets-nav-btn.back")) {
    if (page > 1) {
      page--;
      loadPetsPage({ categoryId, page: - 1 });
    }
    return;
  }

  if (btn.classList.contains("pets-nav-btn.forward")) {
    if (currentPage < totalPages) {
      page++;
      loadPetsPage({ categoryId, page });
    }
    return;
  }

  if (btn.classList.contains("pets-nav-button")) {
    const page = Number(btn.textContent);
    if (!Number.isFinite(page)) return;
    loadPetsPage({ categoryId: currentCategoryId, page });
  }
});

document.querySelector(".pets-category-list").addEventListener("click", (e) => {
  const btn = e.target.closest(".pet-category-button");
  if (!btn) return;

  categoryId = btn.dataset.categoryId || "";
  page = 1;

  loadPetsPage({ categoryId, page });
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

async function loadPetsPage({ categoryId, page } = {}) {
  try {
    showLoader();

    const cid = categoryId;
    const nextPage = Math.max(1, Number(page) || 1);

    const data = await getImagesByQuery(cid, nextPage);
    const animals = data?.animals || [];

    categoryId = cid;
    totalPages = Math.max(1, Math.ceil((data.totalItems || 0) / (data.limit || 1)));
    page = Math.min(nextPage, totalPages);

    clearPetsList();

    if (animals.length === 0) {
      iziToast.info({
        message: "Тварин не знайдено за обраним фільтром.",
        position: "topRight",
      });
      updatePaginationUI();
      return;
    }

    petsObjArray = animals;
    setPets(animals);
    createPetsList(animals);

    updatePaginationUI();
  } catch (error) {
    iziToast.error({
      message: error?.message || "Сталася помилка під час завантаження тварин.",
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

function updatePaginationUI() {
  const prevBtn = document.querySelector('.pets-nav-btn.back');
  const nextBtn = document.querySelector('.pets-nav-btn.forward');

  if (prevBtn) prevBtn.disabled = page === 1;
  if (nextBtn) nextBtn.disabled = page === totalPages;

  document.querySelectorAll('.pets-nav-button').forEach((btn) => {
    btn.classList.toggle(
      'is-active',
      Number(btn.textContent) === page
    );
  });
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
