import dayjs from 'dayjs';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (a = 0, b = 1, count) => {
  const random = Math.random() * (b - a) + a;
  return random.toFixed(count);
};

const humanizeDate = (date) => dayjs(date).format('D MMMM YYYY');

const humanizeRuntime = (runtime) => {
  const hour = Math.floor(runtime / 60);
  const minute = runtime % 60;
  return `${hour}h ${minute}m`;
};
const renderTemplate = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.append(element);
      break;
    case RenderPosition.BEFOREEND:
      container.prepend(element);
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};
const emotions = ['smile', 'sleeping', 'puke', 'angry'];

export {getRandomInteger, getRandomFloat, humanizeDate, humanizeRuntime, renderTemplate, renderElement, createElement, emotions};
