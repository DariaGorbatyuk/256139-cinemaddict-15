import UserView from './view/user';
import MenuView from './view/menu';
import SortMenuView from './view/sort';
import CardView from './view/card';
import FilmsContainerView from './view/films';
import ShowMoreView from './view/showMore';
import FilmsAmountView from './view/filmsAmount';
import PopupView from './view/popup';
import {createFilm} from './mock/film';
import {getRandomInteger, renderElement, RenderPosition} from './utils';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const CART_AMOUNT = 20;
const CART_START = 5;
const CART_ADDED = 5;
const CART_AMOUNT_EXTRA = 2;

const filmsArray = new Array(CART_AMOUNT).fill().map(createFilm);
const lastFilmsArrayIndex = filmsArray.length - 1;
let lastShownFilmIndex = CART_START - 1;


renderElement(header, new UserView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MenuView(filmsArray).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new SortMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);

const filmsListContainers = document.querySelectorAll('.films-list__container');
const filmsList = document.querySelector('.films-list');
const footerStatistics = document.querySelector('.footer__statistics');

const [allMovies, ...extraMovies] = filmsListContainers;

for (let i = 0; i < CART_START; i++) {
  renderElement(allMovies, new CardView(filmsArray[i]).getElement(), RenderPosition.BEFOREEND);
}

extraMovies.forEach((container) => {
  for (let i = 0; i < CART_AMOUNT_EXTRA; i++) {
    renderElement(container, new CardView(filmsArray[getRandomInteger(0, CART_AMOUNT - 1)]).getElement(), RenderPosition.BEFOREEND);
  }
});

renderElement(filmsList, new ShowMoreView().getElement(), RenderPosition.BEFOREEND);
renderElement(footerStatistics, new FilmsAmountView(CART_AMOUNT).getElement());
const btnShowMore = document.querySelector('.films-list__show-more');
btnShowMore.addEventListener('click', onBtnShowMoreClick);

function onBtnShowMoreClick(evt) {
  evt.preventDefault();
  const max = lastShownFilmIndex + CART_ADDED >= lastFilmsArrayIndex ? (lastFilmsArrayIndex - lastShownFilmIndex) : CART_ADDED;
  for (let i = 0, j = lastShownFilmIndex; i < max; i++, j++) {
    renderElement(allMovies, new CardView(filmsArray[j]).getElement(), RenderPosition.BEFOREEND);
  }
  lastShownFilmIndex += CART_ADDED;
  if (lastShownFilmIndex === lastFilmsArrayIndex) {
    evt.target.remove();
  }
}

const pageBody = document.body;
//renderElement(pageBody, new PopupView(filmsArray[0]).getElement(), RenderPosition.BEFOREEND);
