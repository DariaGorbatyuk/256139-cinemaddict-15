import {createUserTemplate} from './view/user';
import {createMenuTemplate} from './view/menu';
import {createSortTemplate} from './view/sort';
import {createCardTemplate} from './view/card';
import {createFilmsConteinerTemplate} from './view/films';
import {createShowMoreBtnTemplate} from './view/showMore';
import {renderFilmsAmount} from './view/filmsAmount';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const CART_AMOUNT = 5;
const CART_AMOUNT_EXTRA = 2;

const render = (container, template, place='beforeend') => {
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
  render(allMovies, createCardTemplate());
}

extraMovies.forEach((container) => {
  for (let i = 0; i < CART_AMOUNT_EXTRA; i++) {
    render(container, createCardTemplate());
  }
});

render(filmsList, createShowMoreBtnTemplate());
render(footerStatistics, renderFilmsAmount());
