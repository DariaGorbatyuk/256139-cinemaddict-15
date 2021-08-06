export const createMenuTemplate = (filmsContainer = {}) => {
  let watchListLength = 0;
  let watchedLength = 0;
  let favoriteLength = 0;
  filmsContainer.forEach(({userInfo}) => {
    const {isWatchList, isWatched, isFavorite} = userInfo;
    if(isWatchList){watchListLength++;}
    if(isWatched){watchedLength++;}
    if(isFavorite){favoriteLength++;}
  });

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchListLength}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedLength}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteLength}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
