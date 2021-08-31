import CardView from '../view/card';
import PopupView from '../view/popup';
import {renderElement, RenderPosition, remove, replace} from '../utils/render';

export default class Film {
  constructor(filmContainer) {
    this._filmContainer = filmContainer;
    this._cardComponent = null;
    this._popupComponent = null;
    this._handlerOpenPopup = this._handlerOpenPopup.bind(this);
    this._handlerClosePopup = this._handlerClosePopup.bind(this);
  }

  init(film) {
    this._film = film;
    const prevCardComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponent;

    this._cardComponent = new CardView(film);
    this._popupComponent = new PopupView(this._film);

    this._cardComponent.setOpenPopupHandler(this._handlerOpenPopup);
    if (prevCardComponent === null) {
      renderElement(this._filmContainer, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.getElement().contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
  }

  _handlerOpenPopup() {
    // if (document.body.contains(this._popupComponent.getElement())) {
    //   this._popupComponent.remove();
    // }
    document.body.classList.add('hide-overflow');
    this._popupComponent.setPopupCloseHandler(this._handlerClosePopup);
    renderElement(document.body, this._popupComponent, RenderPosition.BEFOREEND);
  }

  _handlerClosePopup() {
    remove(this._popupComponent);
    document.body.classList.remove('hide-overflow');
  }
}
