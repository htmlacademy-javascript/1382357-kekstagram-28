const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const STEP = 25;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const imgElement = document.querySelector('.img-upload__preview img');
const scaleControlInput = document.querySelector('.scale__control--value');

const scaleImage = (value) => {
  imgElement.style.transform = `scale(${value / 100})`;
  scaleControlInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleControlInput.value, 10);
  let newValue = currentValue - STEP;
  if(newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleControlInput.value, 10);
  let newValue = currentValue + STEP;
  if(newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);


smallerButton.addEventListener('click', onSmallerButtonClick);

biggerButton.addEventListener('click', onBiggerButtonClick);

export {resetScale, imgElement};
