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
  morePetsButton,
  renderPagination, 
  petsListNavigation,
  isTablet,
  mqTablet
} from "./pets-list-render.js";

export let page = 1;
export let totalPages = 1;
let categoryId = "";
let petsObjArray = [];
const mqDesktop = window.matchMedia("(min-width: 1440px)");
const petsList = document.querySelector(".pets-list");
const petsCategoryList = document.querySelector(".pets-category-list");
const firstCategoryButton = document.querySelector(".pet-category-button.all");
if (firstCategoryButton) firstCategoryButton.classList.add("is-deactive");

loadInitial();

/* івенти */
mqDesktop.addEventListener("change", () => {
  rerenderPetsList();
});

petsCategoryList?.addEventListener("click", (e) => {
  const button = e.target.closest(".pet-category-button");
  if (!button) return;

  const deactiveButton = petsCategoryList.querySelector(
    ".pet-category-button.is-deactive"
  );
  if (deactiveButton) deactiveButton.classList.remove("is-deactive");
  button.classList.add("is-deactive");

  categoryId = button.dataset.categoryId || "";
  page = 1;

  if (!isTablet()) petsObjArray = [];
  clearPetsList();
  hideMorePetsButton();
  showLoader();

  if (isTablet()) {
    loadPetsPage({ categoryId, page: 1 });
  } else {
    getImagesByQueryMaker(categoryId, 1);
  }
});

morePetsButton?.addEventListener("click", (event) => {
    event.preventDefault();
    if (isTablet()) return;

    hideMorePetsButton();
    showLoader();
    page += 1;
    getImagesByQueryMaker(categoryId, page);
  });

petsList?.addEventListener("click", (e) => {
  const btn = e.target.closest(".pets-list-section .button-container");
  if (!btn) return;
  e.preventDefault();

  const petId = btn.dataset.id;
  window.dispatchEvent(
    new CustomEvent("open-animal-modal", {
      detail: { petId },
    })
  );
});

petsListNavigation?.addEventListener("click", async (e) => {
  if (!isTablet()) return;

  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.classList.contains("back")) {
    if (page > 1) {
      await loadPetsPage({ categoryId, page: page - 1 });
      scrollToPetsSection();
    }
    return;
  }

  if (btn.classList.contains("forward")) {
    if (page < totalPages) {
      await loadPetsPage({ categoryId, page: page + 1 });
      scrollToPetsSection();
    }
    return;
  }

  if (btn.classList.contains("pets-nav-button")) {
    const targetPage = Number(btn.textContent.trim());
    if (!Number.isFinite(targetPage)) return;

    await loadPetsPage({ categoryId, page: targetPage });
    scrollToPetsSection();
  }
});

mqTablet.addEventListener("change", () => {
  syncNavigationMode();

  if (isTablet()) {
    loadPetsPage({ categoryId, page });
  } else {
    page = 1;
    petsObjArray = [];
    clearPetsList();
    showLoader();
    getImagesByQueryMaker(categoryId, page);
  }
});

/* функції виконання головної логіки */
function loadInitial() {
  syncNavigationMode();
  showLoader();

  if (isTablet()) {
     getCategoryByQueryMaker()
    loadPetsPage({ categoryId, page: 1 });
  } else {
    petsObjArray = [];
    getCategoryByQueryMaker()
    getImagesByQueryMaker(categoryId, 1);
  }
}

async function getCategoryByQueryMaker() {
  try {
    const data = await getCategoryByQuery();

    if (!Array.isArray(data) || data.length === 0) {
      iziToast.info({
        message: "Категорії не знайдено.",
        position: "topRight",
      });
      return;
    }

    createCategoryList(data);
  } catch (error) {
    iziToast.error({
      message: error?.message || "Сталася помилка під час завантаження категорій.",
      position: "topRight",
    });
  }
}

async function getImagesByQueryMaker(cid, pageArg) {
  try {
    setPaginationLoading(true); 
    hideMorePetsButton();

    const data = await getImagesByQuery(cid, pageArg);
    const animals = data?.animals || [];
    const limit = data?.limit || 1;
    const totalItems = data?.totalItems || 0;

    totalPages = Math.max(1, Math.ceil(totalItems / limit));
    page = Math.min(pageArg, totalPages);
    categoryId = cid;

    if (animals.length === 0) {
      iziToast.info({
        message: "Тварин не знайдено за обраним фільтром.",
        position: "topRight",
      });
      clearPetsList();
      hideMorePetsButton();
      if (petsListNavigation) petsListNavigation.hidden = true;
      return;
    }

    if (!isTablet()) {
      petsObjArray = mergePets(petsObjArray, animals);
      setPets(petsObjArray);
    } else {
      petsObjArray = animals;
      setPets(animals);
    }


    createPetsList(animals);

    if (pageArg === 1) {
      scrollToPetsSection();
    } else {
      scrollPetsList();
    }

    if (!isTablet()) {
      if (petsListNavigation) petsListNavigation.hidden = true;

      if (page >= totalPages) {
        hideMorePetsButton();
        iziToast.info({ message: "Ви переглянули всі доступні результати." });
      } else {
        showMorePetsButton();
      }
    } else {
      hideMorePetsButton();
      renderPagination();
    }
  } catch (error) {
    iziToast.error({
      message: error?.message || "Сталася помилка під час завантаження тварин.",
      position: "topRight",
    });
  } finally {
    hideLoader();
    setPaginationLoading(false);
  }
}

async function loadPetsPage({ categoryId: cid = "", page: next = 1 } = {}) {
  try {
    setPaginationLoading(true);
    
    const nextPage = Math.max(1, Number(next) || 1);

    const data = await getImagesByQuery(cid, nextPage);
    const animals = data?.animals || [];
    const limit = data?.limit || 1;
    const totalItems = data?.totalItems || 0;

    categoryId = cid;
    totalPages = Math.max(1, Math.ceil(totalItems / limit));
    page = Math.min(nextPage, totalPages);

    clearPetsList();

    if (animals.length === 0) {
      iziToast.info({
        message: "Тварин не знайдено за обраним фільтром.",
        position: "topRight",
      });
      renderPagination();
      return;
    }

    petsObjArray = animals;
    setPets(animals);
    createPetsList(animals);

    renderPagination();
  } catch (error) {
    iziToast.error({
      message: error?.message || "Сталася помилка під час завантаження тварин.",
      position: "topRight",
    });
  } finally {
    hideLoader();
    setPaginationLoading(false);
  }
}

function rerenderPetsList() {
  page = 1;
  totalPages = 1;

  if (!isTablet()) {
    petsObjArray = [];
  }

  clearPetsList();
  showLoader();

  if (isTablet()) {
    loadPetsPage({ categoryId, page: 1 });
  } else {
    getImagesByQueryMaker(categoryId, 1);
  }
}

function scrollToPetsSection() {
  const section =
    document.querySelector(".pets-list-section") ||
    document.querySelector(".pets-list") ||
    petsList;

  if (!section) return;

  const yOffset = -50;
  const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

function setPaginationLoading(isLoading) {
  if (!petsListNavigation) return;

  if (!isTablet()) {
    petsListNavigation.hidden = true;
    return;
  }

  petsListNavigation.hidden = !!isLoading;
}

function mergePets(existing, incoming) {
  const map = new Map();
  (existing || []).forEach((p) => p && p._id && map.set(p._id, p));
  (incoming || []).forEach((p) => p && p._id && map.set(p._id, p));
  return Array.from(map.values());
}

function syncNavigationMode() {
  if (!petsListNavigation) return;

  if (isTablet()) {
    hideMorePetsButton();
    petsListNavigation.hidden = false;
    renderPagination();
  } else {
    petsListNavigation.hidden = true;
  }
}

/* функції для модалки "дізнатись більше" */
function setPets(data) {
  petsObjArray = Array.isArray(data) ? data : [];
}

export function getPets() {
  return petsObjArray;
}

export function getPetById(id) {
  return petsObjArray.find((p) => p._id === id);
}
