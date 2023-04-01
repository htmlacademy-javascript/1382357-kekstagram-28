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

export {getRandomInteger, isEscapeKey, heatEffect, chromeEffect, sepiaEffect, marvinEffect, phobosEffect};
