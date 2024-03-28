import { useState } from 'react'
import { StarRating } from '@/components/stars-rating'
import { getMoviePoster } from '@/utils/get-movie-poster'

const MovieDetails = ({ onClickBtnBack, clickedMovie, onSubmitWatchedMovie, watchedMovies }) => {
  const userRating = watchedMovies.find((m) => m.id === clickedMovie.id)?.userRating
  const [rating, setRating] = useState(userRating ?? 0)

  const handleRating = rating => setRating(rating) 

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onClickBtnBack}>
          &larr;
        </button>
        <img
          src={getMoviePoster(clickedMovie.poster)}
          alt={`Poster de ${clickedMovie.title}`}
        />
        <div className="details-overview">
          <h2>{clickedMovie.title}</h2>
          <p>
            {clickedMovie.released} &bull; {clickedMovie.runtime}
          </p>
          <p>{clickedMovie.genre}</p>
          <p>
            <span>⭐</span>
            {clickedMovie.imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} initialRating={rating} color="#FCC419" size={26} onRating={handleRating}/>
          <button className="btn-add" onClick={() => onSubmitWatchedMovie(rating)}>
            {userRating > 0 ? "Alterar nota" : "+ Adicionar á lista"}
          </button>
        </div>
        <p><em>{clickedMovie.plot}</em></p>
        <p>Elenco: {clickedMovie.actors}</p>
        <p>Direção: {clickedMovie.director}</p>
      </section>
    </div>
  )
}

export { MovieDetails }