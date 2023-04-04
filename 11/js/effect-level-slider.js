import {imgElement} from './scale.js';
import {chromeEffect, heatEffect, phobosEffect, marvinEffect, sepiaEffect} from './util.js';

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
  imgElement.className = '';
  imgElement.classList.add('effects__preview--none');
  sliderContainer.classList.add('hidden');
  filterType = null;
};

const showSlider = () => {
  effectLevelSliderElement.classList.remove('hidden');
  imgElement.className = '';
};

const hideSlider = () => {
  effectLevelSliderElement.classList.add('hidden');
  imgElement.className = '';
  imgElement.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
};

const onFilterChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    sliderContainer.classList.remove('hidden');
    if (evt.target.matches('#effect-chrome')) {
      showSlider();
      imgElement.classList.add('effects__preview--chrome');
      filterType = 'grayscale';
      effectLevelSliderElement.noUiSlider.updateOptions(chromeEffect);
    } else if (evt.target.matches('#effect-sepia')) {
      showSlider();
      imgElement.classList.add('effects__preview--sepia');
      filterType = 'sepia';
      effectLevelSliderElement.noUiSlider.updateOptions(sepiaEffect);
    } else if (evt.target.matches('#effect-marvin')) {
      showSlider();
      imgElement.classList.add('effects__preview--marvin');
      filterType = 'invert';
      effectLevelSliderElement.noUiSlider.updateOptions(marvinEffect);
    } else if (evt.target.matches('#effect-phobos')) {
      showSlider();
      imgElement.classList.add('effects__preview--phobos');
      filterType = 'blur';
      effectLevelSliderElement.noUiSlider.updateOptions(phobosEffect);
    } else if (evt.target.matches('#effect-heat')) {
      showSlider();
      imgElement.classList.add('effects__preview--heat');
      filterType = 'brightness';
      effectLevelSliderElement.noUiSlider.updateOptions(heatEffect);
    } else {
      hideSlider();
      imgElement.classList.add('effects__preview--none');
      filterType = null;
    }
  }
};


effectsListElement.addEventListener('change', onFilterChange);

export {createSlider, removeSlider};
