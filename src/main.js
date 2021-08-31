import {createFilm} from './mock/film';
import FilmsList from './presenter/film-list';

const CARD_AMOUNT = 10;


const films = new Array(CARD_AMOUNT).fill().map(createFilm);

const filmsListPresenter = new FilmsList(films);
filmsListPresenter.init();
