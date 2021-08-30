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

const CARD_AMOUNT = 6;
const CARD_START = 5;
const FILMS_COUNT_PER_STEP = 5;

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');

export default class FilmsList {
  constructor() {
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._renderedFilmsExtraCount = EXTRA_FILMS_COUNT;

    this.userComponent = new UserView;
    this.menuComponent = new MenuView;
    this.sortComponent = new SortMenuView;
    this.filmsConteinerComponent = new FilmsContainerView;
    this.showMoreBtnComponent = new ShowMoreView;
    this.filmsAmountComponent = new FilmsAmountView;
    this.noFilmsComponent = new NoFilmsView;
    this.siteMainElement = siteMainElement;
    this.header = header;
    this.filmsList = null;
    this.filmsListContainer = null;
    this.filmsListTopRated = null;
    this.filmsListMostCommented = null;
  }

  init(films) {
    this.films = films.slice();
    this._renderUserInfo();
    this._renderMenu();
    this._renderFilmsContainer();

    this._renderBoard();
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

  _renderFilmsCard() {

  }

  _renderFilmsCards(from, to) {
    this.films.slice(from, to).forEach((film)=>this._renderFilmsCard(film));
  }

  _renderNoFilms() {
    renderElement(this.filmsList, this.noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreBtn() {
    renderElement(this.filmsList, this.showMoreBtnComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if (this.films.length === 0) {
      this._renderNoFilms();
    }

    this._renderFilmsCard(0, Math.min(this.films.length, CARD_START));

    if (this.films.length > CARD_START) {
      this._renderLoadMoreBtn();
    }
  }
}
