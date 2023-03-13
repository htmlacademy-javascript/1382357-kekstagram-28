import { isEscapeKey } from './util.js';
import { picturesList } from './create-pictures.js';
import { getSocialComments } from './social-comment.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

pictures.forEach((picture) => {
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPictureImg.querySelector('img').src = picture.querySelector('.picture__img').src;
    bigPictureImg.querySelector('img').alt = picture.querySelector('.picture__img').alt;
    bigPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;
    bigPicture.querySelector('.social__caption').textContent = picture.querySelector('.picture__img').alt;
    picturesList.forEach((pictureList) => {
      getSocialComments(pictureList.comments);
    });
  });
});

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    closeBigPicture();
  }
});
