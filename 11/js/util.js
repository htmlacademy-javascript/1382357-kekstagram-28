const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const isEscapeKey = (evt) => evt.key === 'Escape';

const chromeEffect = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const sepiaEffect = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const marvinEffect = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
};

const phobosEffect = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const heatEffect = {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const ALERT_SHOW_TIME = 5000;
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-message');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = () => {
  const element = document.createElement('section');
  element.append(successMessageTemplate.cloneNode(true));
  document.body.append(element);

  setTimeout(() => {
    element.remove();
  }, ALERT_SHOW_TIME);
};

const showErrorMessage = () => {
  const element = document.createElement('section');
  element.append(errorMessageTemplate.cloneNode(true));
  document.body.append(element);

  setTimeout(() => {
    element.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getRandomInteger, isEscapeKey, heatEffect, chromeEffect, sepiaEffect, marvinEffect, phobosEffect, showAlert, showErrorMessage, showSuccessMessage, debounce, throttle};
