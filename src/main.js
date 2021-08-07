import {createUserTemplate} from './view/user';
import {createMenuTemplate} from './view/menu';
import {createSortTemplate} from './view/sort';
import {createCardTemplate} from './view/card';
import {createFilmsConteinerTemplate} from './view/films';
import {createShowMoreBtnTemplate} from './view/showMore';
import {createFilmsAmountTemplate} from './view/filmsAmount';
import {createPopupTemplate} from './view/popup';
import {createFilm} from './mock/film';
import {getRandomInteger} from './utils';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const CART_AMOUNT = 5;
const CART_START = 5;
const CART_ADDED = 5;
const CART_AMOUNT_EXTRA = 2;

const filmsArray = new Array(CART_AMOUNT).fill().map(createFilm);
const lastFilmsArrayIndex = filmsArray.length - 1;
let lastShownFilmIndex = CART_START - 1;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

render(header, createUserTemplate());
render(main, createMenuTemplate(filmsArray));
render(main, createSortTemplate());
render(main, createFilmsConteinerTemplate());

const filmsListContainers = document.querySelectorAll('.films-list__container');
const filmsList = document.querySelector('.films-list');
const footerStatistics = document.querySelector('.footer__statistics');

const [allMovies, ...extraMovies] = filmsListContainers;

for (let i = 0; i < CART_START; i++) {
  render(allMovies, createCardTemplate(filmsArray[i]));
}

extraMovies.forEach((container) => {
  for (let i = 0; i < CART_AMOUNT_EXTRA; i++) {
    render(container, createCardTemplate(filmsArray[getRandomInteger(0, CART_AMOUNT - 1)]));
  }
});

render(filmsList, createShowMoreBtnTemplate());
render(footerStatistics, createFilmsAmountTemplate(CART_AMOUNT));
const btnShowMore = document.querySelector('.films-list__show-more');
btnShowMore.addEventListener('click', onBtnShowMoreClick);

function onBtnShowMoreClick(evt) {
  evt.preventDefault();
  const max = lastShownFilmIndex + CART_ADDED >= lastFilmsArrayIndex ? (lastFilmsArrayIndex - lastShownFilmIndex) : CART_ADDED;
  for (let i = 0, j = lastShownFilmIndex; i < max; i++, j++) {
    render(allMovies, createCardTemplate(filmsArray[j]));
  }
  lastShownFilmIndex += CART_ADDED;
  if (lastShownFilmIndex === lastFilmsArrayIndex) {
    evt.target.remove();
  }
}

const pageBody = document.body;
render(pageBody, createPopupTemplate(filmsArray[0]));
