import UserView from '../view/user';
import MenuView from '../view/menu';
import SortMenuView from '../view/sort';
import FilmsContainerView from '../view/films';
import ShowMoreView from '../view/showMore';
import FilmsAmountView from '../view/filmsAmount';
import NoFilmsView from '../view/no-film';
import FilmPresenter from './film';
import {renderElement, RenderPosition, remove} from '../utils/render';

const CARD_START = 5;
const CARD_ADDED = 5;

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');

export default class FilmsList {
  constructor(films) {
    this._CARD_START = CARD_START;
    this._CARD_ADDED = CARD_ADDED;
    this._films = films.slice();
    this._userComponent = new UserView();
    this._menuComponent = new MenuView(this._films);
    this._sortComponent = new SortMenuView();
    this._filmsConteinerComponent = new FilmsContainerView();
    this._filmsAmountComponent = new FilmsAmountView(this._films.length);
    this._noFilmsComponent = new NoFilmsView();
    this._btnShowMore = new ShowMoreView();
    this._siteMainElement = siteMainElement;
    this._header = header;
    this._filmsList = null;
    this._filmsListContainer = null;
    this._lastShownFilmNumber = this._CARD_START;
    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._filmPresenter = new Map();
  }

  init() {
    this._renderUserInfo();
    this._renderMenu();
    this._renderBoard();
    this._renderFilmsAmount();
  }

  _renderUserInfo() {
    renderElement(this._header, this._userComponent, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    renderElement(this._siteMainElement, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this._siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsContainer() {
    renderElement(this._siteMainElement, this._filmsConteinerComponent, RenderPosition.BEFOREEND);
    this._filmsList = document.querySelector('.films-list');
    this._filmsListContainer = document.querySelector('.films-list__container');
  }

  _renderFilmsCard(film) {
    const filmPresenter = new FilmPresenter(this._filmsListContainer);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderFilmsCards(from, to) {
    this._films.slice(from, to).forEach((film) => this._renderFilmsCard(film));
  }

  _renderNoFilms() {
    renderElement(this._filmsList, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreBtnClick() {
    const NumberOfAddedCard = this._lastShownFilmNumber + this._CARD_ADDED >= this._films.length ? (this._films.length - this._lastShownFilmNumber) : this._CARD_ADDED;
    this._films.slice(this._lastShownFilmNumber, this._lastShownFilmNumber + NumberOfAddedCard).forEach((film) => {
      this._renderFilmsCard(film);
      this._lastShownFilmNumber++;
    });
    if (this._lastShownFilmNumber === this._films.length) {
      remove(this._btnShowMore);
    }
  }

  _renderLoadMoreBtn() {
    renderElement(this._filmsList, this._btnShowMore, RenderPosition.BEFOREEND);
    this._btnShowMore.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilmsContainer();
    this._renderFilmsList();
  }

  _renderFilmsList() {
    this._renderFilmsCards(0, Math.min(this._films.length, this._CARD_START));

    if (this._films.length > this._CARD_START) {
      this._renderLoadMoreBtn();
    }
  }

  _renderFilmsAmount() {
    const footerStatistics = document.querySelector('.footer__statistics');
    renderElement(footerStatistics, this._filmsAmountComponent, RenderPosition.BEFOREEND);
  }

  _clearFilmsList() {
    this._filmPresenter.forEach((presenter)=>presenter.destroy());
    this._filmPresenter.clear();
    this._lastShownFilmNumber = this._CARD_START;
    remove(this._btnShowMore);
  }
}
