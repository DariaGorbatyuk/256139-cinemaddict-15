import {createUserTemplate} from './view/user';
import {createMenuTemplate} from './view/menu';
import {createSortTemplate} from './view/sort';
import {createCardTemplate} from "./view/card";
import {createFilmsConteinerTemplate} from './view/films';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const CART_AMOUNT = 5;
const CART_AMOUNT_EXTRA = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(header, createUserTemplate(), 'beforeend');
render(main, createMenuTemplate(), 'beforeend');
render(main, createSortTemplate(), 'beforeend');
render(main, createFilmsConteinerTemplate(), 'beforeend');

const filmsListContainers = document.querySelectorAll('.films-list__container');
const [allMovies, ...extraMovies] = filmsListContainers;

for (let i = 0; i < CART_AMOUNT; i++) {
  render(allMovies, createCardTemplate(), 'beforeend');
}

extraMovies.forEach((container) => {
  for (let i = 0; i < CART_AMOUNT_EXTRA; i++) {
    render(container, createCardTemplate(), 'beforeend');
  }
});
