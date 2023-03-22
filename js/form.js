import {body} from './big-picture.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadLabel = document.querySelector('.img-upload__label');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const hashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
const HASHTAGS_MAX_LENGTH = 5;
const HASHTAGS_ERROR_TEXT = 'Начните с #, хэш-теги не должны повторяться';

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
};

const closeModal = () => {
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if(evt.key === 'Escape' && !isTextInputFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

const isValidTag = (tag) => hashtag.test(tag);
const hasValidCount = (tags) => tags.length <= HASHTAGS_MAX_LENGTH;
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split('')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(hashtagsInput, validateTags, HASHTAGS_ERROR_TEXT);

const onFormSubmit = () => {
  pristine.validate();
};

imgUploadLabel.addEventListener('click', () => {
  openModal();
});

imgUploadCancel.addEventListener('click', () => {
  closeModal();
});
form.addEventListener('submit', onFormSubmit);
