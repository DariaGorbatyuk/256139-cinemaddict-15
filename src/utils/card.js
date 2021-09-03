import dayjs from 'dayjs';

const humanizeDate = (date) => dayjs(date).format('D MMMM YYYY');

const humanizeRuntime = (runtime) => {
  const hour = Math.floor(runtime / 60);
  const minute = runtime % 60;
  return `${hour}h ${minute}m`;
};

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const sortFilmByDate = (film1, film2) => {
  const date2 = dayjs(film2.filmInfo.release.date);
  const date1 = dayjs(film1.filmInfo.release.date);
  return date2.diff(date1);
};

const sortFilmByRating = (film1, film2) => film2.filmInfo.rating - film1.filmInfo.rating;

export {humanizeDate, humanizeRuntime, EMOTIONS, sortFilmByDate, sortFilmByRating};
