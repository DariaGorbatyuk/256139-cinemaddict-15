import dayjs from 'dayjs';
import AbstractView from './abstract';
import {humanizeRuntime} from '../utils/card';

const createCardTemplate = (film = {}) => {
  const {comments, userInfo, filmInfo} = film;
  const {isWatchList, isWatched, isFavorite} = userInfo;
  const {title, rating, release, runtime, genre, poster, description} = filmInfo;
  const watchListClass = isWatchList ? 'film-card__controls-item--active' : '';
  const watchedClass = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteClass = isFavorite ? 'film-card__controls-item--active' : '';
  const releaseYear = dayjs(release.date).format('YYYY');
  const humanRuntime = humanizeRuntime(runtime);
  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseYear}</span>
            <span class="film-card__duration">${humanRuntime}</span>
            <span class="film-card__genre">${genre.join(',')}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${description}</p>
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
    this._openPopupOpenHandler = this._openPopupOpenHandler.bind(this);
  }

  _openPopupOpenHandler(evt) {
    evt.preventDefault();
    this._callback.openPopupOpen();
  }

  setOpenPopupOpenHandler(callback) {
    this._callback.openPopupOpen = callback;
    this.getElement().querySelector('img').addEventListener('click', this._openPopupOpenHandler);
    this.getElement().querySelector('h3').addEventListener('click', this._openPopupOpenHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openPopupOpenHandler);
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }
}
