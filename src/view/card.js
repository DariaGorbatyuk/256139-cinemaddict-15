import dayjs from "dayjs";

export const createCardTemplate = (film = {}) => {
  const {comments, userInfo, filmInfo} = film;
  const {isWatchList, isWatched, isFavorite} = userInfo;
  const {title, rating, release, runtime, genre, poster, description} = filmInfo;
  const watchListClass = isWatchList ? 'film-card__controls-item--active' : '';
  const watchedClass = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteClass = isFavorite ? 'film-card__controls-item--active' : '';
  const releaseYear = dayjs(release.date).format('YYYY');
  const humanizeRuntime = () => ({
    h: Math.floor(runtime / 60),
    m: runtime % 60,
  });
  const humanRuntime = humanizeRuntime();
  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseYear}</span>
            <span class="film-card__duration">${humanRuntime.h}h ${humanRuntime.m}m</span>
            <span class="film-card__genre">${genre.join(',')}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchListClass}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClass}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClass}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};
