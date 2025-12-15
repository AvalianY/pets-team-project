import { getPetById } from './pets-list.js';

const modal = document.querySelector('.animal-details-modal');
const closeBtn = modal?.querySelector('.icon');

// DOM елементи для заповнення даними (використовуємо ID)
const modalImage = modal?.querySelector('.placeholder-image');
const petNameEl = document.getElementById('pet-name');
const petTypeEl = document.getElementById('pet-type');
const ageEl = document.getElementById('age');
const genderEl = document.getElementById('gender');
const descEl = document.getElementById('desc');
const healthEl = document.getElementById('health');
const behaviourEl = document.getElementById('behaviour');

// Функція відкриття модалки
export function openModal() {
  modal?.classList.remove('visually-hidden');
  document.body.style.overflow = 'hidden';
}

// Функція закриття модалки
export function closeModal() {
  modal?.classList.add('visually-hidden');
  document.body.style.overflow = '';

  // Очищення даних модалки
  if (modalImage) {
    modalImage.src = '';
    modalImage.alt = '';
  }
  if (petNameEl) petNameEl.textContent = '';
  if (petTypeEl) petTypeEl.textContent = '';
  if (ageEl) ageEl.textContent = '';
  if (genderEl) genderEl.textContent = '';
  if (descEl) descEl.textContent = '';
  if (healthEl) healthEl.textContent = '';
  if (behaviourEl) behaviourEl.textContent = '';
}

// Функція відкриття модалки з даними тварини
function openModalWithId(petId) {
  const pet = getPetById(petId);
  console.log(pet);

  if (!pet) {
    console.error('Pet not found:', petId);
    return;
  }

  // Попереднє завантаження зображення
  const img = new Image();
  img.onload = () => {
    // Заповнення даними з об'єкта pet після завантаження зображення
    if (modalImage) {
      modalImage.src = pet.image || '';
      modalImage.alt = pet.name || '';
    }
    if (petNameEl) petNameEl.textContent = pet.name || '';
    if (petTypeEl) petTypeEl.textContent = pet.species || '';
    if (ageEl) ageEl.textContent = pet.age || '';
    if (genderEl) genderEl.textContent = pet.gender || '';
    if (descEl) descEl.textContent = pet.description || '';
    if (healthEl) healthEl.textContent = pet.healthStatus || '';
    if (behaviourEl) behaviourEl.textContent = pet.behavior || '';

    openModal();
  };
  img.onerror = () => {
    console.error('Failed to load image:', pet.image);
    // Відкриваємо модалку навіть якщо зображення не завантажилось
    if (modalImage) {
      modalImage.src = pet.image || '';
      modalImage.alt = pet.name || '';
    }
    if (petNameEl) petNameEl.textContent = pet.name || '';
    if (petTypeEl) petTypeEl.textContent = pet.species || '';
    if (ageEl) ageEl.textContent = pet.age || '';
    if (genderEl) genderEl.textContent = pet.gender || '';
    if (descEl) descEl.textContent = pet.description || '';
    if (healthEl) healthEl.textContent = pet.healthStatus || '';
    if (behaviourEl) behaviourEl.textContent = pet.behavior || '';

    openModal();
  };
  img.src = pet.image || '';
}

// Закриття по кліку на хрестик
closeBtn?.addEventListener('click', closeModal);

// Закриття по кліку на backdrop
modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Закриття по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal?.classList.contains('visually-hidden')) {
    closeModal();
  }
});

// Підписка на подію відкриття модалки
window.addEventListener('open-animal-modal', (e) => {
  openModalWithId(e.detail.petId);
});