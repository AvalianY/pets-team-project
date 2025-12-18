import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/api',
  });

const refs = {
  overlay: document.querySelector('.order-modal-overlay'),
  modal: document.querySelector('.order-modal'),
  closeBtn: document.querySelector('.order-btn-close'),
  form: document.querySelector('.order-form'),
  nameInput: document.querySelector('#user-name'),
  phoneInput: document.querySelector('#user-tel'),
  commentInput: document.querySelector('#user-comment'),
  submitBtn: document.querySelector('.btn-send'),
};

let animalId = null;

/* =========================
   OPEN MODAL BY CUSTOM EVENT
========================= */

window.addEventListener('open-order-modal', event => {
  const petId = event?.detail?.petId;

  if (!petId) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося визначити тварину для заявки',
      position: 'topRight',
    });
    return;
  }

  animalId = petId;
  openModal();
});

/* =========================
   OPEN / CLOSE MODAL
========================= */

function openModal() {
  
  refs.overlay.classList.add('is-open');
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');

  refs.submitBtn.disabled = true;
  checkFormValidity();

  document.addEventListener('keydown', onEscPress);
}

function closeModal() {
  refs.overlay.classList.remove('is-open');
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');

  refs.form.reset();
    
  refs.submitBtn.disabled = true;
    
  clearFieldError(refs.nameInput);
  clearFieldError(refs.phoneInput);
  clearFieldError(refs.commentInput);

  animalId = null;

  document.removeEventListener('keydown', onEscPress);
}

refs.closeBtn.addEventListener('click', closeModal);

refs.overlay.addEventListener('click', event => {
  if (event.target === refs.overlay) {
    closeModal();
  }
});

function onEscPress(event) {
  if (event.key === 'Escape' && refs.overlay.classList.contains('is-open')) {
    closeModal();
  }
}

/* =========================
   FORM SUBMIT
========================= */

refs.form.addEventListener('submit', async event => {
  event.preventDefault();

  const name = refs.nameInput.value.trim();
  const rawPhone = refs.phoneInput.value;
  const comment = refs.commentInput.value.trim();

  const phone = normalizePhone(rawPhone);

  if (!validateForm(name, phone, comment)) {
    return;
  }

  const payload = {
    name,
    phone,
    comment: comment || undefined,
    animalId,
  };

  try {
    await api.post('/orders', payload);

    iziToast.success({
      title: 'Успішно',
      message: 'Заявку відправлено',
      position: 'topRight',
    });

    closeModal();
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося відправити заявку',
      position: 'topRight',
    });
  }
});

/* =========================
   VALIDATION
========================= */

function validateForm(name, phone, comment) {
  let isValid = true;

  clearFieldError(refs.nameInput);
  clearFieldError(refs.phoneInput);
  clearFieldError(refs.commentInput);

  if (!name || name.length < 3 || name.length > 32) {
  setFieldError(refs.nameInput, 'Імʼя має бути від 3 до 32 символів');
  isValid = false;
  }

  if (!phone || !/^[0-9]{12}$/.test(phone)) {
    setFieldError(refs.phoneInput, 'Введіть коректний номер телефону');
    isValid = false;
  }

  if (comment && comment.length > 500) {
    setFieldError(
      refs.commentInput,
      'Коментар не може перевищувати 500 символів'
    );
    isValid = false;
  }

  if (!animalId) {
    iziToast.error({
      message: 'Не обрано тварину',
      position: 'topRight',
    });
    isValid = false;
  }

  return isValid;
}

function setFieldError(field, message) {
  field.classList.add('is-error');

  const errorText = field
    .closest('.order-container-area, .order-container-label')
    ?.querySelector('.order-error-text');

  if (errorText) {
    errorText.textContent = message;
    errorText.classList.add('is-visible');
  }
}

function clearFieldError(field) {
  field.classList.remove('is-error');

  const errorText = field
    .closest('.order-container-area, .order-container-label')
    ?.querySelector('.order-error-text');

  if (errorText) {
    errorText.classList.remove('is-visible');
    errorText.textContent = '';
  }
}

refs.nameInput.addEventListener('input', () => {
  let value = refs.nameInput.value.trim();

  value = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ\s-]/g, '');

  refs.nameInput.value = value;

  clearFieldError(refs.nameInput);

  if (value.length > 0 && value.length < 3) {
    setFieldError(refs.nameInput, 'Мінімум 3 символи');
  } else if (value.length > 32) {
    setFieldError(refs.nameInput, 'Максимум 32 символи');
  }

  checkFormValidity();
});

refs.phoneInput.addEventListener('input', () => {
  let value = refs.phoneInput.value;

  value = value.replace(/[^0-9+]/g, '');

  if (value.includes('+')) {
    value =
      '+' +
      value
        .replace(/\+/g, '')
        .replace(/^/, '');
  }

  refs.phoneInput.value = value;

  const phone = normalizePhone(value);

  clearFieldError(refs.phoneInput);

  if (phone && !/^[0-9]{12}$/.test(phone)) {
    setFieldError(refs.phoneInput, 'Введіть коректний номер телефону');
  }

  checkFormValidity();
});

refs.commentInput.addEventListener('input', () => {
  const value = refs.commentInput.value.trim();

  clearFieldError(refs.commentInput);

  if (value.length > 500) {
    setFieldError(refs.commentInput, 'Максимум 500 символів');
  }

  checkFormValidity();
});

/* =========================
   PHONE NORMALIZATION
========================= */

function normalizePhone(value) {
  let digits = value.replace(/\D/g, '');

  if (digits.length === 10 && digits.startsWith('0')) {
    digits = '38' + digits;
  }

  if (digits.length === 12 && digits.startsWith('380')) {
    return digits;
  }

  return digits;
}

/* =========================
   SUBMIT DISABLED
========================= */

function checkFormValidity() {
  const name = refs.nameInput.value.trim();
  const phone = normalizePhone(refs.phoneInput.value);
  const comment = refs.commentInput.value.trim();

  const isNameValid = name.length >= 3 && name.length <= 32;
  const isPhoneValid = /^[0-9]{12}$/.test(phone);
  const isCommentValid = comment.length <= 500;

  refs.submitBtn.disabled = !(isNameValid && isPhoneValid && isCommentValid);
}