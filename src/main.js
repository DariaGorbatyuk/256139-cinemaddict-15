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
const CART_AMOUNT = 20;
const CART_START = 5;
const CART_ADDED = 5;
const CART_AMOUNT_EXTRA = 2;

const filmsArray = new Array(CART_AMOUNT).fill().map(createFilm);
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

for (let i = 0, j = 1; i < CART_START; i++, j++) {
  render(allMovies, createCardTemplate(filmsArray[j]));
}

extraMovies.forEach((container) => {
  for (let i = 0; i < CART_AMOUNT_EXTRA; i++) {
    render(container, createCardTemplate(filmsArray[getRandomInteger(0, CART_AMOUNT - 1)]));
  }
});

render(filmsList, createShowMoreBtnTemplate());
render(footerStatistics, createFilmsAmountTemplate(CART_AMOUNT));
const btnShoMore = document.querySelector('.films-list__show-more');
btnShoMore.addEventListener('click', onBtnShowMoreClick);

function onBtnShowMoreClick(evt) {
  evt.preventDefault();
  const max = lastShownFilmIndex + CART_ADDED >= filmsArray.length - 1 ? (filmsArray.length - 1 - lastShownFilmIndex) : CART_ADDED;
  for (let i = 0, j = lastShownFilmIndex; i < max; i++, j++) {
    render(allMovies, createCardTemplate(filmsArray[j]));
  }
  lastShownFilmIndex += CART_ADDED;
  if (lastShownFilmIndex === filmsArray.length - 1) {
    evt.target.remove();
  }
}

const pageBody = document.body;
render(pageBody, createPopupTemplate(filmsArray[0]));
