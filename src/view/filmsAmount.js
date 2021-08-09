import {createElement} from '../utils';
const createFilmsAmountTemplate = (numberOfFilms) => (`<p>
    ${numberOfFilms} movies inside</p>`
);

export default class FilmsAmount {
  constructor(numberOfFilms) {
    this._element = null;
    this._numberOfFilms = numberOfFilms;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this._numberOfFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
