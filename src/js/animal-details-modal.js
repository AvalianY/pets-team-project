import { getPetById } from './pets-list.js';

const modal = document.querySelector('.animal-details-modal');
const closeBtn = modal?.querySelector('.icon');
const adoptBtn = modal?.querySelector('.button');

const petImageContainer = modal?.querySelector('.pet-image');

let modalImage = null;
const petNameEl = document.getElementById('pet-name');
const petTypeEl = document.getElementById('pet-type');
const ageEl = document.getElementById('age');
const genderEl = document.getElementById('gender');
const descEl = document.getElementById('desc');
const healthEl = document.getElementById('health');
const behaviourEl = document.getElementById('behaviour');

function getModalImage() {
  if (modalImage) return modalImage;
  if (!petImageContainer) return null;

  modalImage = document.createElement('img');
  modalImage.classList.add('placeholder-image');
  modalImage.alt = '';
  petImageContainer.appendChild(modalImage);
  return modalImage;
}

let currentPetId = null;

function openModal() {
  modal?.classList.remove('visually-hidden');
  document.body.classList.add('lock-scroll');
  document.documentElement.classList.add('lock-scroll');
}

function closeModal() {
  modal?.classList.add('visually-hidden');
  document.body.classList.remove('lock-scroll');
  document.documentElement.classList.remove('lock-scroll');

  const imageEl = getModalImage();
  if (imageEl) {
    imageEl.src = '';
    imageEl.alt = '';
  }
  if (petNameEl) petNameEl.textContent = '';
  if (petTypeEl) petTypeEl.textContent = '';
  if (ageEl) ageEl.textContent = '';
  if (genderEl) genderEl.textContent = '';
  if (descEl) descEl.textContent = '';
  if (healthEl) healthEl.textContent = '';
  if (behaviourEl) behaviourEl.textContent = '';

  currentPetId = null;
}

function openModalWithId(petId) {
  const pet = getPetById(petId);
  currentPetId = petId;

  if (!pet) {
    openModal();
    return;
  }

  const imageEl = getModalImage();
  const img = new Image();
  img.onload = () => {
    if (imageEl) {
      imageEl.src = pet.image || '';
      imageEl.alt = pet.name || '';
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
    if (imageEl) {
      imageEl.src = pet.image || '';
      imageEl.alt = pet.name || '';
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

adoptBtn?.addEventListener('click', () => {
  const petId = currentPetId;
  closeModal();
  window.dispatchEvent(
    new CustomEvent('open-order-modal', { detail: { petId } })
  );
});

closeBtn?.addEventListener('click', closeModal);

modal?.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal?.classList.contains('visually-hidden')) {
    closeModal();
  }
});

window.addEventListener('open-animal-modal', e => {
  openModalWithId(e.detail.petId);
});
