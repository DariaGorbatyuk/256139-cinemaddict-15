import dayjs from 'dayjs';
import AbstractView from './abstract';
import {humanizeRuntime} from '../utils/card';

const SHORT_DESCRIPTION_LENGTH = 139;

const createCardTemplate = (film = {}) => {
  const {comments, userInfo, filmInfo} = film;
  const {isWatchList, isWatched, isFavorite} = userInfo;
  const {title, rating, release, runtime, genre, poster, description} = filmInfo;
  const watchListClass = isWatchList ? 'film-card__controls-item--active' : '';
  const watchedClass = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteClass = isFavorite ? 'film-card__controls-item--active' : '';
  const releaseYear = dayjs(release.date).format('YYYY');
  const humanRuntime = humanizeRuntime(runtime);
  const shortDescription = description.length > SHORT_DESCRIPTION_LENGTH ? `${description.slice(0, SHORT_DESCRIPTION_LENGTH)}...` : description;
  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseYear}</span>
            <span class="film-card__duration">${humanRuntime}</span>
            <span class="film-card__genre">${genre.join(',')}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${shortDescription}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchListClass}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClass}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClass}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class Card extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._addToFavoriteHandler = this._addToFavoriteHandler.bind(this);
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._alreadyWatchedHandler = this._alreadyWatchedHandler.bind(this);
  }

  _openPopupHandler(evt) {
    evt.preventDefault();
    this._callback.onPopupOpen();
  }

  setOpenPopupHandler(callback) {
    this._callback.onPopupOpen = callback;
    this.getElement().querySelector('img').addEventListener('click', this._openPopupHandler);
    this.getElement().querySelector('h3').addEventListener('click', this._openPopupHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openPopupHandler);
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  _addToFavoriteHandler(evt) {
    evt.preventDefault();
    this._callback.onAddToFavorite();
  }

  setToFavoriteClickHandler(callback) {
    this._callback.onAddToFavorite = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._addToFavoriteHandler);
  }

  _addToWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.onAddToWatchList();
  }

  setToWatchListClickHandler(callback) {
    this._callback.onAddToWatchList = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._addToWatchListHandler);
  }

  _alreadyWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.onAlreadyWatched();
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.onAlreadyWatched = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._alreadyWatchedHandler);
  }
}
