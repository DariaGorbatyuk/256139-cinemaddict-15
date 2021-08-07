export const createMenuTemplate = (allFilms = {}) => {
  const filmsToFilter = {
    watchlist: allFilms.filter(({userInfo}) => userInfo.isWatchList).length,
    history: allFilms.filter(({userInfo}) => userInfo.isWatched).length,
    favorites: allFilms.filter(({userInfo}) => userInfo.isFavorite).length,
  };
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filmsToFilter.watchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filmsToFilter.history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filmsToFilter.favorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
