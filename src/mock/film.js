import {getRandomInteger, getRandomFloat} from '../utils/common';
import {createComment} from './comment';

const films = [
  {
    title: 'Made for each other',
    poster: 'made-for-each-other.png',
  },
  {
    title: 'Popeye meets sinbad',
    poster: 'popeye-meets-sinbad.png',
  },
  {
    title: 'Sagebrush trail',
    poster: 'sagebrush-trail.jpg',
  },
  {
    title: 'Santa claus conquers the martians',
    poster: 'santa-claus-conquers-the-martians.jpg',
  },
  {
    title: 'The dance of life',
    poster: 'the-dance-of-life.jpg',
  },
  {
    title: 'The great flamarion',
    poster: 'the-great-flamarion.jpg',
  },
  {
    title: 'The man with the golden arm',
    poster: 'the-man-with-the-golden-arm.jpg',
  },
];
const names = ['Erich von Stroheim', 'Mary Beth', 'Dan Duryea', 'Richard Weil', 'Anne Wigton', 'Heinz Herald'];
const countries = ['Finland', 'USA', 'Russia', 'Italy', 'France', 'German'];
const genres = ['Comedy', 'Mystery', ' Film-Noir', 'Drama', 'Musical', 'Detective'];
const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'.split('.');
const ages = [0, 6, 12, 16, 18];


export const createFilm = () => {
  const film = films[getRandomInteger(0, films.length - 1)];
  const watched = Boolean(getRandomInteger(0, 1));
  const watchedDate = watched ? new Date(getRandomInteger(2000, 2020), getRandomInteger(0, 11), getRandomInteger(0, 30)) : null;
  const comments = new Array(getRandomInteger(0, 5)).fill().map(createComment);
  return {
    comments: comments,
    userInfo: {
      isWatchList: Boolean(getRandomInteger(0, 1)),
      isWatched: watched,
      isFavorite: Boolean(getRandomInteger(0, 1)),
      watchedDate: watchedDate,
    },
    filmInfo: {
      title: film.title,
      originalTitle: film.title,
      rating: getRandomFloat(0, 10, 1),
      poster: film.poster,
      ageRating: ages[getRandomInteger(0, ages.length - 1)],
      director: names[getRandomInteger(0, names.length - 1)],
      writers: names.slice(0, getRandomInteger(1, names.length - 1)),
      actors: names.slice(0, getRandomInteger(1, names.length - 1)),
      release: {
        date: new Date(getRandomInteger(1930, 2020), getRandomInteger(0, 11), getRandomInteger(0, 30)),
        releaseCountry: countries[getRandomInteger(0, countries.length - 1)],
      },
      runtime: getRandomInteger(60, 120),
      genre: genres.slice(0, getRandomInteger(1, genres.length - 1)),
      description: description.slice(0, description.length - 1).join('.'),
    },
  };
};
