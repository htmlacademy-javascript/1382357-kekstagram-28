import {body} from './big-picture.js';
import {resetScale} from './scale.js';
import { createSlider, removeSlider } from './effect-level-slider.js';
import { sendData } from './api.js';
import { showAlert } from './util.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadLabel = document.querySelector('.img-upload__label');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const hashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
const HASHTAGS_MAX_LENGTH = 5;
let errorText = '';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isTextInputFocused = () =>
  document.activeElement === hashtagsInput ||
  document.activeElement === commentInput;

const openModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  createSlider();
};

const closeModal = () => {
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  removeSlider();
  resetScale();
};

function onDocumentKeydown (evt) {
  if(evt.key === 'Escape' && !isTextInputFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

const isValidTag = (tag) => {
  errorText = 'Начните с #, не используйте пробелы, спецсимволы, символы пунктуации, эмодзи';
  return hashtag.test(tag);
};
const hasValidCount = (tags) => {
  errorText = 'Количество хештегов не может превышать 5';
  return tags.length <= HASHTAGS_MAX_LENGTH;
};
const hasUniqueTags = (tags) => {
  errorText = 'Хэш-теги не должны повторяться';
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

const getErrorText = () => errorText;

pristine.addValidator(hashtagsInput, validateTags, getErrorText);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            showAlert(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

imgUploadLabel.addEventListener('click', () => {
  openModal();
});

imgUploadCancel.addEventListener('click', () => {
  closeModal();
});

// onFormSubmit(closeModal);

// form.addEventListener('submit', onFormSubmit);

export{closeModal, onFormSubmit};
