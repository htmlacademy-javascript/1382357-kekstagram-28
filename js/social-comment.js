const socialCommentsContainer = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentsListFragment = document.createDocumentFragment();

const getSocialComments = (comments) => {
  socialCommentsContainer.innerHTML = '';
  comments.forEach((comment) => {
    const commentElement = socialComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    socialCommentsListFragment.appendChild(commentElement);
  });
  socialCommentsContainer.appendChild(socialCommentsListFragment);
};

export {getSocialComments};
