import {createFilm} from './mock/film';
import FilmsList from './presenter/movie-list';

const CARD_AMOUNT = 20;


const films = new Array(CARD_AMOUNT).fill().map(createFilm);

const filmsListPresenter = new FilmsList(films);
filmsListPresenter.init();
