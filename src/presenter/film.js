import CardView from '../view/card';
import PopupView from '../view/popup';
import {renderElement, RenderPosition, remove, replace} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};
export default class Film {
  constructor(filmContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._cardComponent = null;
    this._popupComponent = null;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this.mode = Mode.DEFAULT;
    this._handlerOpenPopup = this._handlerOpenPopup.bind(this);
    this._handlerClosePopup = this._handlerClosePopup.bind(this);
    this._handleAddToFavoriteClick = this._handleAddToFavoriteClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;
    const prevCardComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponent;

    this._cardComponent = new CardView(this._film);
    this._popupComponent = new PopupView(this._film);

    this._cardComponent.setOpenPopupHandler(this._handlerOpenPopup);

    this._cardComponent.setToWatchListClickHandler(this._handleAddToWatchlistClick);
    this._cardComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._cardComponent.setToFavoriteClickHandler(this._handleAddToFavoriteClick);

    this._popupComponent.setPopupCloseHandler(this._handlerClosePopup);
    this._popupComponent.setToWatchListClickHandler(this._handleAddToWatchlistClick);
    this._popupComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._popupComponent.setToFavoriteClickHandler(this._handleAddToFavoriteClick);

    if (prevCardComponent === null) {
      renderElement(this._filmContainer, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.contains(prevCardComponent.getElement())) {

      replace(this._cardComponent, prevCardComponent);

      if (this.mode === Mode.DETAILS) {
        this._popupComponent.scrollPosition = prevPopupComponent.setScrollPosition();
        replace(this._popupComponent, prevPopupComponent);
        this._popupComponent.restoreScrollPosition();
      }
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  resetView() {
    if (this.mode !== Mode.DEFAULT) {
      this._handlerClosePopup();
      this.mode = Mode.DEFAULT;
    }
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
  }

  _handleAddToWatchlistClick() {
    this._changeData(Object.assign(
      {},
      this._film,
      this._film.userInfo.isWatchList = !this._film.userInfo.isWatchList,
    ));
  }

  _handleAlreadyWatchedClick() {
    this._changeData(Object.assign(
      {},
      this._film,
      this._film.userInfo.isWatched = !this._film.userInfo.isWatched,
    ));
  }

  _handleAddToFavoriteClick() {
    this._changeData(Object.assign(
      {},
      this._film,
      this._film.userInfo.isFavorite = !this._film.userInfo.isFavorite,
    ));
  }

  _handlerOpenPopup() {
    this._popupComponent = new PopupView(this._film);
    this._popupComponent.setPopupCloseHandler(this._handlerClosePopup);
    this._popupComponent.setToWatchListClickHandler(this._handleAddToWatchlistClick);
    this._popupComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._popupComponent.setToFavoriteClickHandler(this._handleAddToFavoriteClick);
    this._changeMode();
    this.mode = Mode.DETAILS;
    document.body.classList.add('hide-overflow');
    renderElement(document.body, this._popupComponent, RenderPosition.BEFOREEND);
  }

  _handlerClosePopup() {
    remove(this._popupComponent);
    document.body.classList.remove('hide-overflow');
    this.mode = Mode.DEFAULT;
  }
}
