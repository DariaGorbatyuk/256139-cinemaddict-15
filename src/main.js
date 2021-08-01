import {createUserTemplate} from './view/user';
import {createMenuTemplate} from './view/menu';
import {createSortTemplate} from './view/sort';
import {createCardTemplate} from './view/card';
import {createFilmsConteinerTemplate} from './view/films';
import {createShowMoreBtnTemplate} from './view/showMore';
import {createFilmsAmountTemplate} from './view/filmsAmount';
import {createPopupTemplate} from './view/popup';
import {createFilm} from './mock/film';
//console.log(createFilm());

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const CART_AMOUNT = 5;
const CART_AMOUNT_EXTRA = 2;

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

for (let i = 0; i < CART_AMOUNT; i++) {
  render(allMovies, createCardTemplate(createFilm()));
}

extraMovies.forEach((container) => {
  for (let i = 0; i < CART_AMOUNT_EXTRA; i++) {
    render(container, createCardTemplate(createFilm()));
  }
});

render(filmsList, createShowMoreBtnTemplate());
render(footerStatistics, createFilmsAmountTemplate(createFilm()));

const pageBody = document.body;
//render(pageBody, createPopupTemplate());
