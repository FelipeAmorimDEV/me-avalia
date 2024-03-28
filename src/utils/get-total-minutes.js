const getTotalMinutes = watchedMovies => watchedMovies
  .reduce((acc, item) => acc + (item.runtime === 'N/A' ? 0 : +item.runtime.split(' ')[0]), 0)

  export { getTotalMinutes }