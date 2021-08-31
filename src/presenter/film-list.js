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
    this.CARD_START = CARD_START;
    this.CARD_ADDED = CARD_ADDED;
    this.films = films.slice();
    this.userComponent = new UserView();
    this.menuComponent = new MenuView(this.films);
    this.sortComponent = new SortMenuView();
    this.filmsConteinerComponent = new FilmsContainerView();
    this.filmsAmountComponent = new FilmsAmountView(this.films.length);
    this.noFilmsComponent = new NoFilmsView();
    this.btnShowMore = new ShowMoreView();
    this.siteMainElement = siteMainElement;
    this.header = header;
    this.filmsList = null;
    this.filmsListContainer = null;
    this.lastShownFilmNumber = this.CARD_START;
    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
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
    const filmPresenter = new FilmPresenter(this.filmsListContainer);
    filmPresenter.init(film);
  }

  _renderFilmsCards(from, to) {
    this.films.slice(from, to).forEach((film) => this._renderFilmsCard(film));
  }

  _renderNoFilms() {
    renderElement(this.filmsList, this.noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreBtnClick() {
    const NumberOfAddedCard = this.lastShownFilmNumber + this.CARD_ADDED >= this.films.length ? (this.films.length - this.lastShownFilmNumber) : this.CARD_ADDED;
    this.films.slice(this.lastShownFilmNumber, this.lastShownFilmNumber + NumberOfAddedCard).forEach((film) => {
      this._renderFilmsCard(film);
      this.lastShownFilmNumber++;
    });
    if (this.lastShownFilmNumber === this.films.length) {
      remove(this.btnShowMore);
    }
  }

  _renderLoadMoreBtn() {
    renderElement(this.filmsList, this.btnShowMore, RenderPosition.BEFOREEND);
    this.btnShowMore.setClickHandler(this._handleLoadMoreBtnClick);
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
    this._renderFilmsCards(0, Math.min(this.films.length, this.CARD_START));

    if (this.films.length > this.CARD_START) {
      this._renderLoadMoreBtn();
    }
  }

  _renderFilmsAmount() {
    const footerStatistics = document.querySelector('.footer__statistics');
    renderElement(footerStatistics, this.filmsAmountComponent, RenderPosition.BEFOREEND);
  }
}
