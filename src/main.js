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
const CARD_AMOUNT = 6;
const CARD_START = 5;
const CARD_ADDED = 5;
const CARD_AMOUNT_EXTRA = 2;
const body = document.body;

const filmsArray = new Array(CARD_AMOUNT).fill().map(createFilm);


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

  cardComponent.setOpenPopupClickHandler(()=>{
    if (body.lastElementChild.matches('.film-details')) {
      body.lastElementChild.remove();
    }
    body.appendChild(popupComponent.getElement());
    body.classList.add('hide-overflow');
    popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', onPopupClose);
  });
};

extraMovies.forEach((container) => {
  for (let i = 0; i < CARD_AMOUNT_EXTRA; i++) {
    renderFilm(container, filmsArray[getRandomInteger(0, CARD_AMOUNT - 1)]);
  }
});

renderElement(footerStatistics, new FilmsAmountView(CARD_AMOUNT).getElement());

for (let i = 0; i < Math.min(filmsArray.length, CARD_START); i++) {
  renderFilm(allMovies, filmsArray[i]);
}

if (filmsArray.length > CARD_START) {
  let lastShownFilmNumber = CARD_START;
  const btnShowMore = new ShowMoreView();
  renderElement(filmsList, btnShowMore.getElement(), RenderPosition.BEFOREEND);

  btnShowMore.setClickHandler(() => {
    const NumberOfAddedCard = lastShownFilmNumber + CARD_ADDED >= filmsArray.length ? (filmsArray.length - lastShownFilmNumber) : CARD_ADDED;
    filmsArray.slice(lastShownFilmNumber, lastShownFilmNumber + NumberOfAddedCard).forEach((film) => {
      renderFilm(allMovies, film);
      lastShownFilmNumber++;
    });
    if(lastShownFilmNumber === filmsArray.length){
      btnShowMore.getElement().remove();
    }
  });
}

