import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
  animalId = event.detail.petId;
  openModal();
});

/* =========================
   OPEN / CLOSE MODAL
========================= */

function openModal() {
  refs.overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  refs.submitBtn.disabled = true;
  checkFormValidity();
  window.addEventListener('keydown', onEscPress);
}

function closeModal() {
  refs.overlay.classList.remove('is-open');
  document.body.style.overflow = '';
  refs.form.reset();
  animalId = null;
  window.removeEventListener('keydown', onEscPress);
}

refs.closeBtn.addEventListener('click', closeModal);

refs.overlay.addEventListener('click', event => {
  if (event.target === refs.overlay) {
    closeModal();
  }
});

function onEscPress(event) {
  if (event.key === 'Escape') {
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
    await axios.post('/orders', payload);

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
  if (!name || name.length > 32) {
    iziToast.warning({
      message: 'Імʼя обовʼязкове (до 32 символів)',
      position: 'topRight',
    });
    return false;
  }

  if (!phone || !/^[0-9]{12}$/.test(phone)) {
    iziToast.warning({
      message: 'Введіть коректний номер телефону',
      position: 'topRight',
    });
    return false;
  }

  if (comment && comment.length > 500) {
    iziToast.warning({
      message: 'Коментар не може перевищувати 500 символів',
      position: 'topRight',
    });
    return false;
  }

  if (!animalId) {
    iziToast.error({
      message: 'Не обрано тварину',
      position: 'topRight',
    });
    return false;
  }

  return true;
}

/* =========================
   PHONE NORMALIZATION
========================= */

function normalizePhone(value) {
  // залишаємо тільки цифри
  let digits = value.replace(/\D/g, '');

  // якщо номер починається з 0 → додаємо код України
  if (digits.length === 10 && digits.startsWith('0')) {
    digits = '38' + digits;
  }

  // якщо ввели +380...
  if (digits.length === 12 && digits.startsWith('380')) {
    return digits;
  }

  return digits;
}

/* =========================
   SUBMIT DISABLED
========================= */

// === FORM INPUT EVENTS TO TOGGLE SUBMIT ===
[refs.nameInput, refs.phoneInput].forEach(input => {
  input.addEventListener('input', checkFormValidity);
});

function checkFormValidity() {
  const name = refs.nameInput.value.trim();
  const phone = normalizePhone(refs.phoneInput.value);

  // Якщо всі обов'язкові поля заповнені та валідні — активуємо кнопку
  if (name && name.length <= 32 && /^[0-9]{12}$/.test(phone)) {
    refs.submitBtn.disabled = false;
  } else {
    refs.submitBtn.disabled = true;
  }
}