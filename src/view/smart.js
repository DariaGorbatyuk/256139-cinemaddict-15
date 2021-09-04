import Abstract from './abstract';
import {replace} from '../utils/render';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._state = {};
  }

  updateState(update, justDataUpdating = false) {
    if (!update) {
      return;
    }
    this._state = Object.assign({},
      this._state,
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
