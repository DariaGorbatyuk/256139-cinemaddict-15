import CardView from '../view/card';
import PopupView from '../view/popup';
import {renderElement, RenderPosition, remove} from '../utils/render';

export default class Film {
  constructor(filmContainer) {
    this._filmContainer = filmContainer;
    this._handlerOpenPopup = this._handlerOpenPopup.bind(this);
    this._handlerClosePopup = this._handlerClosePopup.bind(this);
  }

  init(film) {
    this._film = film;
    this.cardComponent = new CardView(this._film);
    this.popupComponent = new PopupView(this._film);
    this.cardComponent.setOpenPopupHandler(this._handlerOpenPopup);
    renderElement(this._filmContainer, this.cardComponent, RenderPosition.BEFOREEND);
  }

  _handlerOpenPopup() {
    if (document.body.lastElementChild.matches('.film-details')) {
      document.body.lastElementChild.remove();
    }
    document.body.classList.add('hide-overflow');
    this.popupComponent.setPopupCloseHandler(this._handlerClosePopup);
    renderElement(document.body, this.popupComponent, RenderPosition.BEFOREEND);
  }

  _handlerClosePopup() {
    remove(this.popupComponent);
    document.body.classList.remove('hide-overflow');
  }
}
