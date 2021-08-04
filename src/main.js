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
//console.log(createFilm());

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const CART_AMOUNT = 20;
const CART_START = 5;
const CART_ADDED = 5;
const CART_AMOUNT_EXTRA = 2;
const filmsContainer = new Array(CART_AMOUNT).fill().map(createFilm);


const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

render(header, createUserTemplate());
render(main, createMenuTemplate());
render(main, createSortTemplate());
render(main, createFilmsConteinerTemplate());

const filmsListContainers = document.querySelectorAll('.films-list__container');
const filmsList = document.querySelector('.films-list');
const footerStatistics = document.querySelector('.footer__statistics');

const [allMovies, ...extraMovies] = filmsListContainers;

for (let i = 0, j=1; i < CART_START; i++, j++) {
  render(allMovies, createCardTemplate(filmsContainer[j]));
}

extraMovies.forEach((container) => {
  for (let i = 0; i < CART_AMOUNT_EXTRA; i++) {
    render(container, createCardTemplate(filmsContainer[getRandomInteger(0, CART_AMOUNT-1)]));
  }
});

render(filmsList, createShowMoreBtnTemplate());
render(footerStatistics, createFilmsAmountTemplate(CART_AMOUNT));

const pageBody = document.body;
render(pageBody, createPopupTemplate(filmsContainer[0]));
