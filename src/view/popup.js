import {humanizeDate, humanizeRuntime, EMOTIONS} from '../utils/card';
import dayjs from 'dayjs';
import SmartView from './smart';

const createPopupTemplate = (state = {}) => {
  const {comments, userInfo, filmInfo, isComments, newCommentData, chosenEmoji} = state;
  const {isWatchList, isWatched, isFavorite} = userInfo;
  const {
    title,
    originalTitle,
    rating,
    poster,
    ageRating,
    director,
    writers,
    actors,
    release,
    runtime,
    genre,
    description,
  } = filmInfo;
  const watchListClass = isWatchList ? 'film-details__control-button--active' : '';
  const watchedClass = isWatched ? 'film-details__control-button--active' : '';
  const favoriteClass = isFavorite ? 'film-details__control-button--active' : '';
  const releaseDate = humanizeDate(release.date);
  const filmRuntime = humanizeRuntime(runtime);
  const genreKey = genre.length === 1 ? 'Genre' : 'Genres';
  const tableData = [
    ['Director', director],
    ['Writers', writers],
    ['Actors', actors],
    ['Release Date', releaseDate],
    ['Runtime', filmRuntime],
    ['Country', release.releaseCountry],
    [genreKey, genre],
  ];

  const createTableDate = () => tableData.map(([key, value]) => {
    value = Array.isArray(value) ? value.join(', ') : value;
    return `
            <tr class="film-details__row">
              <td class="film-details__term">${key}</td>
              <td class="film-details__cell">${value}</td>
            </tr>`;
  }).join('\n');

  const createCommentsList = () => comments.map((comment) => `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD HH:mm')}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`).join('\n');

  const createExistingCommentsBlock = () => `<h3 class="film-details__comments-title">Comments
    <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">
      ${createCommentsList()}
    </ul>`;

  const createEmojiList = () => EMOTIONS.map((emotion) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${emotion === chosenEmoji ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${emotion}">
              <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
            </label>`).join('\n');

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

          <p class="film-details__age">${ageRating}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${originalTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>
          <table class="film-details__table">
          ${createTableDate()}
          </table>
          <p class="film-details__film-description">
          ${description}
            </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchListClass}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${watchedClass} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClass}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        ${isComments ? createExistingCommentsBlock() : ''}
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${chosenEmoji ? `<img src="./images/emoji/${chosenEmoji}.png" width="55" height="55" alt="emoji">` : ''}</div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newCommentData ? newCommentData : ''}</textarea>
          </label>
          <div class="film-details__emoji-list">
          ${createEmojiList()}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class Popup extends SmartView {
  constructor(state) {
    super();
    this._state = Popup.parseInformationToSate(state);
    this._popupCloseHandler = this._popupCloseHandler.bind(this);
    this._addToFavoriteHandler = this._addToFavoriteHandler.bind(this);
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._alreadyWatchedHandler = this._alreadyWatchedHandler.bind(this);
    this._inputCommentTextAreaHandler = this._inputCommentTextAreaHandler.bind(this);
    this._chooseEmojiHandler = this._chooseEmojiHandler.bind(this);

    this._setInnerHandlers();
  }


  _inputCommentTextAreaHandler(evt) {
    evt.preventDefault();
    this.updateState({
      newCommentData: evt.target.value,
    }, true);
  }

  _chooseEmojiHandler(evt) {
    evt.preventDefault();
    this.setScrollPosition();
    this.updateState({
      chosenEmoji: evt.target.value,
    });
    this.restoreScrollPosition();
  }

  setScrollPosition() {
    this.scrollPosition = this.getElement().scrollTop;
    return this.scrollPosition;
  }

  restoreScrollPosition() {
    if (this.scrollPosition === 0) {
      return;
    }
    this.getElement().scrollTo(0, this.scrollPosition);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._inputCommentTextAreaHandler);
    this.getElement().querySelectorAll('.film-details__emoji-item')
      .forEach((input) => input.addEventListener('click', this._chooseEmojiHandler));
  }

  _setOuterHandlers() {
    this.setPopupCloseHandler(this._callback.onPopupClose);
    this.setToWatchListClickHandler(this._callback.onAddToWatchList);
    this.setAlreadyWatchedClickHandler(this._callback.onAlreadyWatched);
    this.setToFavoriteClickHandler(this._callback.onAddToFavorite);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setOuterHandlers();
  }

  static parseInformationToSate(film) {
    return Object.assign({},
      film,
      {
        isComments: Boolean(film.comments.length > 0),
      });
  }

  static parseSateToInformation(state) {
    state = Object.assign({}, state);
    delete state.isComments;
    delete state.newCommentData;
    delete state.chosenEmoji;
    return state;
  }

  _popupCloseHandler(evt) {
    evt.preventDefault();
    this._callback.onPopupClose();
  }

  setPopupCloseHandler(callback) {
    this._callback.onPopupClose = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseHandler);
  }

  getTemplate() {
    return createPopupTemplate(this._state);
  }

  _addToFavoriteHandler(evt) {
    evt.preventDefault();
    this._callback.onAddToFavorite();
  }

  setToFavoriteClickHandler(callback) {
    this._callback.onAddToFavorite = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._addToFavoriteHandler);
  }

  _addToWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.onAddToWatchList();
  }

  setToWatchListClickHandler(callback) {
    this._callback.onAddToWatchList = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._addToWatchListHandler);
  }

  _alreadyWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.onAlreadyWatched();
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.onAlreadyWatched = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._alreadyWatchedHandler);
  }
}
