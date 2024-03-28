import { getMoviePoster } from "../utils/get-movie-poster"

const WatchedMovies = ({ watchedMovies, onClickBtnDelete, onClickMovie }) => {
  return (
    watchedMovies.map((watchedMovie) => (
      <li key={watchedMovie.id} onClick={() => onClickMovie(watchedMovie)}>
        <img
          src={getMoviePoster(watchedMovie.poster)}
          alt={`Poster de ${watchedMovie.title}`}
        />
        <h3>{watchedMovie.title}</h3>
        <div>
          <p>
            <span>⭐</span>
            <span>{watchedMovie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{watchedMovie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{watchedMovie.runtime}</span>
          </p>
          <button
            className="btn-delete"
            onClick={(e) => {
              e.stopPropagation()
              onClickBtnDelete(watchedMovie.id)
            }
            }
          >
            X
          </button>
        </div>
      </li>
    ))
  )
}

export { WatchedMovies }