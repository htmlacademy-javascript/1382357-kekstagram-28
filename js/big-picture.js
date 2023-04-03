import { isEscapeKey } from './util.js';
import { pictureList } from './create-pictures.js';
import { getSocialComments } from './social-comment.js';


const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img');

function onPicturesClick (evt) {
  if(evt.target.closest('.picture')) {
    openBigPicture();
    const pictureId = evt.target.dataset.id;

    const currentPicture = pictureList[pictureId];
    bigPictureImg.querySelector('img').src = currentPicture.url;
    bigPictureImg.querySelector('img').alt = currentPicture.description;
    bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;
    bigPicture.querySelector('.comments-count').textContent = currentPicture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = currentPicture.description;
    getSocialComments(currentPicture.comments);
  }
}

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

picturesContainer.addEventListener('click', onPicturesClick);

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export {body};
