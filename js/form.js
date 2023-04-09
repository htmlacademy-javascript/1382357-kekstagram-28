import {body} from './big-picture.js';
import {resetScale} from './scale.js';
import { createSlider, removeSlider } from './effect-level-slider.js';
import { isEscapeKey } from './util.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const hashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
const HASHTAGS_MAX_LENGTH = 5;
const HASHTAGS_RULE_MESSAGE = 'Начните с #, не используйте пробелы, спецсимволы, символы пунктуации, эмодзи';
const HASHTAGS_LENGTH_MESSAGE = 'Количество хештегов не может превышать 5';
const HASHTAGS_UNIQUE_MESSAGE = 'Хэш-теги не должны повторяться';
let errorText = '';
const fileInput = document.querySelector('#upload-file');

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
  document.addEventListener('keydown', onFormKeydown);
  createSlider();
};

const closeModal = () => {
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormKeydown);
  removeSlider();
  resetScale();
};

function onFormKeydown (evt) {
  if(isEscapeKey && !isTextInputFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

const isValidTag = (tag) => {
  errorText = HASHTAGS_RULE_MESSAGE;
  return hashtag.test(tag);
};
const hasValidCount = (tags) => {
  errorText = HASHTAGS_LENGTH_MESSAGE;
  return tags.length <= HASHTAGS_MAX_LENGTH;
};
const hasUniqueTags = (tags) => {
  errorText = HASHTAGS_UNIQUE_MESSAGE;
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

const getSubmitButtonBlocked = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const getSubmitButtonUnblocked = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      getSubmitButtonBlocked();
      await cb(new FormData(form));
      getSubmitButtonUnblocked();
    }
  });
};

const onFileInputChange = () => {
  openModal();
};

const onImgUploadClick = () => {
  closeModal();
};

fileInput.addEventListener('change', onFileInputChange);

imgUploadCancel.addEventListener('click', onImgUploadClick);

export{closeModal, onFormSubmit, form, onFormKeydown};
