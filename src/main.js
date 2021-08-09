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
const CART_AMOUNT = 6;
const CART_START = 5;
const CART_ADDED = 5;
const CART_AMOUNT_EXTRA = 2;
const body = document.body;

const filmsArray = new Array(CART_AMOUNT).fill().map(createFilm);


renderElement(header, new UserView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MenuView(filmsArray).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new SortMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);

const filmsListContainers = document.querySelectorAll('.films-list__container');
const filmsList = document.querySelector('.films-list');
const footerStatistics = document.querySelector('.footer__statistics');

const [allMovies, ...extraMovies] = filmsListContainers;

const renderFilm = (filmsContainer, film) => {
  const cardComponent = new CardView(film);
  const popupComponent = new PopupView(film);

  renderElement(filmsContainer, cardComponent.getElement(), RenderPosition.BEFOREEND);

  function onPopupClose(evt) {
    evt.preventDefault();
    body.removeChild(popupComponent.getElement());
    body.classList.remove('hide-overflow');
  }

  function onOpenPopup(evt) {
    evt.preventDefault();
    if (body.lastElementChild.matches('.film-details')) {
      body.lastElementChild.remove();
    }
    body.appendChild(popupComponent.getElement());
    body.classList.add('hide-overflow');
    popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', onPopupClose);
  }

  [cardComponent.getElement().querySelector('img'),
    cardComponent.getElement().querySelector('h3'),
    cardComponent.getElement().querySelector('.film-card__comments'),
  ].forEach((item) => item.addEventListener('click', onOpenPopup));
};

extraMovies.forEach((container) => {
  for (let i = 0; i < CART_AMOUNT_EXTRA; i++) {
    renderFilm(container, filmsArray[getRandomInteger(0, CART_AMOUNT - 1)]);
  }
});

renderElement(footerStatistics, new FilmsAmountView(CART_AMOUNT).getElement());

for (let i = 0; i < Math.min(filmsArray.length, CART_START); i++) {
  renderFilm(allMovies, filmsArray[i]);
}

if (filmsArray.length > CART_START) {
  let lastShownFilmNumber = CART_START;
  const btnShowMore = new ShowMoreView().getElement();
  renderElement(filmsList, btnShowMore, RenderPosition.BEFOREEND);

  btnShowMore.addEventListener('click', (evt) => {
    evt.preventDefault();
    const NumberOfAddedCard = lastShownFilmNumber + CART_ADDED >= filmsArray.length ? (filmsArray.length - lastShownFilmNumber) : CART_ADDED;
    filmsArray.slice(lastShownFilmNumber, lastShownFilmNumber + NumberOfAddedCard).forEach((film) => {
      renderFilm(allMovies, film);
      lastShownFilmNumber++;
    });
    if(lastShownFilmNumber === filmsArray.length){
      btnShowMore.remove();
    }
  });
}

