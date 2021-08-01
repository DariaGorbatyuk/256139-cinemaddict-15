import {getRandomInteger} from '../utils';
import {getRandomFloat} from '../utils';
import dayjs from 'dayjs';


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
const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('.');
const ages = [0, 6, 12, 16, 18];
const commentsList = ['Awesome!', 'Interesting setting and a good cast.', 'Almost two hours? Seriously?', 'Boooooring('];
const emotions = ['smile', 'sleeping', 'puke', 'angry'];
const createCommentDate = () => {
  const monthGap = 11;
  const dayGap = 30;
  return dayjs().subtract(getRandomInteger(0, monthGap), 'month').subtract(getRandomInteger(0, dayGap), 'day');
};

const createComment = () => ({
  id: getRandomInteger(0, 1000),
  author: names[getRandomInteger(0, names.length - 1)],
  comment: commentsList[getRandomInteger(0, commentsList.length - 1)],
  date: createCommentDate(),
  emotion: emotions[getRandomInteger(0, emotions.length - 1)],
});

export const createFilm = () => {
  const film = films[getRandomInteger(0, films.length - 1)];
  const watched = Boolean(getRandomInteger(0, 1));
  const watchedDate = watched ? new Date(getRandomInteger(2000, 2020), getRandomInteger(0, 11), getRandomInteger(0, 30)) : null;
  const commentCount = getRandomInteger(0, 5);
  const comments = new Array(commentCount).fill().map(() => createComment().id);
  return {
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
      runtime: getRandomInteger(45, 120),
      genre: genres.slice(0, getRandomInteger(1, genres.length - 1)),
      description: description.slice(0, description.length - 1).join('.'),
      userInfo: {
        isWatchList: Boolean(getRandomInteger(0, 1)),
        isWatched: watched,
        watchedDate: watchedDate,
        isFavorite: Boolean(getRandomInteger(0, 1)),
      },
      comments: comments,
    },
  };
};
