import {imgElement} from './scale.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects__list');
let filterType;

imgElement.style.filter = '';

const createSlider = () => {
  imgElement.style.filter = '';
  noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  effectLevelSliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValueElement.value = unencoded[handle];
    if (filterType === 'invert') {
      imgElement.style.filter = `${filterType}(${effectLevelValueElement.value}%)`;
    } else if (filterType === 'blur') {
      imgElement.style.filter = `${filterType}(${effectLevelValueElement.value}px)`;
    } else if(filterType === 'grayscale' || filterType === 'sepia' || filterType === 'brightness') {
      imgElement.style.filter = `${filterType}(${effectLevelValueElement.value})`;
    }
  });
};

const removeSlider = () => {
  effectLevelSliderElement.noUiSlider.destroy();
  imgElement.style.removeProperty('filter');
  imgElement.classList.add('effects__preview--none');
  imgElement.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--chrome', 'effects__preview--heat');
  sliderContainer.classList.add('hidden');
  filterType = null;
};

const onFilterChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    sliderContainer.classList.remove('hidden');
    if (evt.target.matches('#effect-chrome')) {
      effectLevelSliderElement.classList.remove('hidden');
      imgElement.classList.add('effects__preview--chrome');
      imgElement.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat', 'effects__preview--none');
      filterType = 'grayscale';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if (evt.target.matches('#effect-sepia')) {
      effectLevelSliderElement.classList.remove('hidden');
      imgElement.classList.add('effects__preview--sepia');
      imgElement.classList.remove('effects__preview--chrome', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat', 'effects__preview--none');
      filterType = 'sepia';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if (evt.target.matches('#effect-marvin')) {
      effectLevelSliderElement.classList.remove('hidden');
      imgElement.classList.add('effects__preview--marvin');
      imgElement.classList.remove('effects__preview--sepia', 'effects__preview--chrome', 'effects__preview--phobos', 'effects__preview--heat', 'effects__preview--none');
      filterType = 'invert';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    } else if (evt.target.matches('#effect-phobos')) {
      effectLevelSliderElement.classList.remove('hidden');
      imgElement.classList.add('effects__preview--phobos');
      imgElement.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--chrome', 'effects__preview--heat', 'effects__preview--none');
      filterType = 'blur';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (evt.target.matches('#effect-heat')) {
      effectLevelSliderElement.classList.remove('hidden');
      imgElement.classList.add('effects__preview--heat');
      imgElement.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--chrome', 'effects__preview--none');
      filterType = 'brightness';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else {
      imgElement.style.removeProperty('filter');
      sliderContainer.classList.add('hidden');
      imgElement.classList.add('effects__preview--none');
      imgElement.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--chrome', 'effects__preview--heat');
      effectLevelSliderElement.classList.add('hidden');
      filterType = null;
    }
  }
};


effectsListElement.addEventListener('change', onFilterChange);

export {createSlider, removeSlider};
