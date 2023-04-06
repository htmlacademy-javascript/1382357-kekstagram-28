const COMMENTS_SHOWN_PART = 5;
const socialCommentsContainer = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentsListFragment = document.createDocumentFragment();
const commentsLoader = document.querySelector('.comments-loader');
const commentsCount = document.querySelector('.comments-count');
const commentsNumber = document.querySelector('.comments-number');
let commentsShown = 0;

const getSocialComments = (comments) => {
  socialCommentsContainer.innerHTML = '';
  commentsCount.textContent = comments.length;
  comments.forEach((comment) => {
    const commentElement = socialComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    socialCommentsListFragment.appendChild(commentElement);
  });

  socialCommentsContainer.appendChild(socialCommentsListFragment);

  if (comments.length > COMMENTS_SHOWN_PART) {
    commentsNumber.textContent = COMMENTS_SHOWN_PART;
    commentsCount.textContent = comments.length;
    commentsLoader.classList.remove('hidden');
    const commentsList = document.querySelectorAll('.social__comment');
    for(let i = COMMENTS_SHOWN_PART; i <= commentsList.length - 1; i++) {
      const comment = commentsList[i];
      comment.classList.add('hidden');
      commentsShown = COMMENTS_SHOWN_PART;
    }

  } else if(comments.length <= COMMENTS_SHOWN_PART) {
    commentsLoader.classList.add('hidden');
    commentsCount.textContent = comments.length;
    commentsNumber.textContent = comments.length;
  }
};

commentsLoader.addEventListener('click', () => {
  const commentsList = document.querySelectorAll('.social__comment');
  commentsShown += COMMENTS_SHOWN_PART;
  commentsNumber.textContent = commentsShown;
  if(commentsShown < commentsList.length) {
    for(let i = 0; i <= commentsShown - 1; i++) {
      commentsList[i].classList.remove('hidden');
    }
  } else if(commentsShown >= commentsList.length) {
    commentsNumber.textContent = commentsList.length;
    commentsLoader.classList.add('hidden');
    for(let i = 0; i < commentsList.length; i++) {
      commentsList[i].classList.remove('hidden');
    }
  }
});

export {getSocialComments};
