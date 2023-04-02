const pictureTemplate = document.querySelector('#picture').content;
const pictureContainer = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach(({url, description, id, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__img').dataset.id = id;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
  });

  pictureContainer.appendChild(pictureFragment);
};

export {renderGallery};
