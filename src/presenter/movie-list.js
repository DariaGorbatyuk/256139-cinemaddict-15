import UserView from '../view/user';
import MenuView from '../view/menu';
import SortMenuView from '../view/sort';
import CardView from '../view/card';
import FilmsContainerView from '../view/films';
import ShowMoreView from '../view/showMore';
import FilmsAmountView from '../view/filmsAmount';
import PopupView from '../view/popup';
import NoFilmsView from '../view/no-film';
import {renderElement, RenderPosition, remove} from '../utils/render';

const CARD_START = 5;
const CARD_ADDED = 5;
const FILMS_COUNT_PER_STEP = 5;

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');

export default class FilmsList {
  constructor(films) {
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this.films = films.slice();
    this.userComponent = new UserView();
    this.menuComponent = new MenuView(this.films);
    this.sortComponent = new SortMenuView();
    this.filmsConteinerComponent = new FilmsContainerView();
    this.filmsAmountComponent = new FilmsAmountView(this.films.length);
    this.noFilmsComponent = new NoFilmsView();
    this.siteMainElement = siteMainElement;
    this.header = header;
    this.filmsList = null;
    this.filmsListContainer = null;
    this.lastShownFilmNumber = CARD_START;
  }

  init() {
    this._renderUserInfo();
    this._renderMenu();
    this._renderBoard();
    this._renderFilmsAmount();
  }

  _renderUserInfo() {
    renderElement(this.header, this.userComponent, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    renderElement(this.siteMainElement, this.menuComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this.siteMainElement, this.sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsContainer() {
    renderElement(this.siteMainElement, this.filmsConteinerComponent, RenderPosition.BEFOREEND);
    this.filmsList = document.querySelector('.films-list');
    this.filmsListContainer = document.querySelector('.films-list__container');
  }

  _renderFilmsCard(film) {
    const cardComponent = new CardView(film);
    const popupComponent = new PopupView(film);

    renderElement(this.filmsListContainer, cardComponent, RenderPosition.BEFOREEND);

    cardComponent.setOpenPopupOpenHandler(() => {
      if (document.body.lastElementChild.matches('.film-details')) {
        document.body.lastElementChild.remove();
      }
      renderElement(document.body, popupComponent, RenderPosition.BEFOREEND);
      document.body.classList.add('hide-overflow');
      popupComponent.setPopupCloseHandler(() => {
        remove(popupComponent);
        document.body.classList.remove('hide-overflow');
      });
    });
  }

  _renderFilmsCards(from, to) {
    this.films.slice(from, to).forEach((film) => this._renderFilmsCard(film));
  }

  _renderNoFilms() {
    renderElement(this.filmsList, this.noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreBtn() {
    const btnShowMore = new ShowMoreView();
    renderElement(this.filmsList, btnShowMore, RenderPosition.BEFOREEND);

    btnShowMore.setClickHandler(() => {
      const NumberOfAddedCard = this.lastShownFilmNumber + CARD_ADDED >= this.films.length ? (this.films.length - this.lastShownFilmNumber) : CARD_ADDED;
      this.films.slice(this.lastShownFilmNumber, this.lastShownFilmNumber + NumberOfAddedCard).forEach((film) => {
        this._renderFilmsCard(film);
        this.lastShownFilmNumber++;
      });
      if (this.lastShownFilmNumber === this.films.length) {
        remove(btnShowMore);
      }
    });
  }

  _renderBoard() {
    if (this.films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilmsContainer();
    this._renderFilmsList();
  }

  _renderFilmsList() {
    this._renderFilmsCards(0, Math.min(this.films.length, CARD_START));

    if (this.films.length > CARD_START) {
      this._renderLoadMoreBtn();
    }
  }

  _renderFilmsAmount() {
    const footerStatistics = document.querySelector('.footer__statistics');
    renderElement(footerStatistics, this.filmsAmountComponent, RenderPosition.BEFOREEND);
  }
}
