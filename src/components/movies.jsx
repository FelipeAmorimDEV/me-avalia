import { getMoviePoster } from '@/utils/get-movie-poster'
import { Loader } from './loader'

const Movies = ({ movies, onClickMovie, isFetchingMovie }) => {
  return isFetchingMovie
    ? <Loader />
    : (movies.map((movie) => (
      <li key={movie.id} onClick={() => onClickMovie(movie)}>
        <img src={getMoviePoster(movie.poster)} alt={`Poster de ${movie.title}`} />
        <h3>{movie.title}</h3>
        <p>
          <span>📅</span>
          <span>{movie.year}</span>
        </p>
      </li>
    )))
}

export { Movies }

