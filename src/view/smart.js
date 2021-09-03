import Abstract from './abstract';
import {replace} from '../utils/render';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateState(update, justDataUpdating = false) {
    if (!update) {
      return;
    }
    this._data = Object.assign({},
      this._data,
      update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replace(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
