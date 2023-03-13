import {createPhotoDescription} from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();
const picturesList = createPhotoDescription();

picturesList.forEach((pictureItem) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pictureItem.url;
  pictureElement.querySelector('.picture__img').alt = pictureItem.description;
  pictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
  pictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;

  pictureFragment.appendChild(pictureElement);
});

pictureContainer.appendChild(pictureFragment);

export {picturesList};
