import { renderGallery} from './create-pictures.js';
import { latestPictures } from './main.js';
import { debounce } from './util.js';
const RERENDER_DELAY = 500;
const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imgFilters = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
let currentFilter = Filter.DEFAULT;

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...latestPictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...latestPictures].sort(sortByComments);
    default:
      return [...latestPictures];
  }
};

const clearPictureContainer = () => {
  const pictureLoaded = document.querySelectorAll('.picture');
  pictureLoaded.forEach((element) => element.remove());
};

const getNewGallery = () => {
  clearPictureContainer();
  const currentList = getFilteredPictures(currentFilter);
  renderGallery(currentList);
};

const debouncedGetNewGallery = debounce(getNewGallery, RERENDER_DELAY);

const onButtonsClick = (evt) => {
  if(evt.target.matches('#filter-random')) {
    currentFilter = Filter.RANDOM;
    filterRandomButton.classList.add('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    debouncedGetNewGallery();
  } else if (evt.target.matches('#filter-discussed')) {
    filterDiscussedButton.classList.add('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    currentFilter = Filter.DISCUSSED;
    debouncedGetNewGallery();
  } else if(evt.target.matches('#filter-default')){
    currentFilter = Filter.DEFAULT;
    filterDefaultButton.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    debouncedGetNewGallery();
  }
};

imgFilters.addEventListener('click', onButtonsClick);

const setImgFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

export { getFilteredPictures, imgFilters, setImgFilters};
