import { getRandomInteger } from './util.js';

const NAMES = [
  'Конни',
  'Якоб',
  'Тим',
  'Соня',
  'Иван Иваныч',
  'Марта',
  'Ярослав',
  'Саша',
];

const DESCRIPTIONS = [
  'Пустой пляж',
  'Указатель на пляж',
  'Камни, море, небо',
  'Фотограф на пляже',
  'Рисовые человечки в супе',
  'Дорогая машина',
  'Дисерт из клубники',
  'Натюрморт',
  'Самолет и люди на пляже',
  'Умное хранение обуви',
  'За забором пляж',
  'Белая ауди',
  'Пример сервировки блюд в нашем кафе',
  'Котосуши',
  'Когда тапки - космос',
  'Небо, горы, самолет',
  'Певцы в хоре',
  'Ретро-авто',
  'Умные ночные тапки',
  'Вечерний двор с пальмами',
  'Салат из курицы с лаймом',
  'Закат на море',
  'Местный житель',
  'На концерте',
  'Автомобиль и гиппопотам',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createPhotoDescription = () => {
  const photoDescription = [];

  for (let i = 0; i < 25; i++) {
    const commentsCount = getRandomInteger(1, 6);
    const comments = [];
    for (let j = 0; j <= commentsCount; j++) {
      const comment = {
        id: (j + 1) * 15,
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
        name: NAMES[getRandomInteger(0, NAMES.length - 1)],
      };
      comments.push(comment);
    }

    const photo = {
      id: i + 1,
      url: `photos/${(i + 1)}.jpg`,
      description: DESCRIPTIONS[i],
      likes: getRandomInteger(15, 200),
      comments: comments,
    };

    photoDescription.push(photo);
  }

  return photoDescription;
};

export {createPhotoDescription};
