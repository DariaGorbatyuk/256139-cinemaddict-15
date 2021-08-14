import AbstractView from './abstract';

const createFilmsAmountTemplate = (numberOfFilms) => (`<p>
    ${numberOfFilms} movies inside</p>`
);

export default class FilmsAmount extends AbstractView{
  constructor(numberOfFilms) {
    super();
    this._numberOfFilms = numberOfFilms;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this._numberOfFilms);
  }
}
