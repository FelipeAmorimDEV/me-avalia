import { useClickedMovie } from '@/hooks/use-clicked-movie'
import { History } from '@/components/history'
import { WatchedMovies } from '@/components/watched-movies'
import { Movies } from '@/components/movies'
import { MovieDetails } from '@/components/movie-details'
import { Loader } from './loader'
import { useWatchedMovies } from '../hooks/use-watched-movies'
import { useRef } from 'react'

const ListBox = ({ children }) => <ul className='box'>{children}</ul>

const Main = ({ movies, detailsMovieRef, isFetchingMovie }) => {
  const watchedMoviesRef = useRef(null)

  const {
    clickedMovie,
    handleClickMovie,
    setClickedMovie,
    isFetchingMovieDetails
  } = useClickedMovie({ watchedMoviesRef })

  const { 
    watchedMovies, 
    handleSubmitWatchedMovie, 
    handleClickBtnBack, 
    handleClickBtnDelete 
  } = useWatchedMovies({ clickedMovie, setClickedMovie, watchedMoviesRef })

  detailsMovieRef.current = setClickedMovie

  return (
    <main className="main">
      <ListBox>
        <ul className="list list-movies">
          {movies.length > 0 && <Movies movies={movies} onClickMovie={handleClickMovie} isFetchingMovie={isFetchingMovie} />}
        </ul>
      </ListBox>
      <ListBox>
        {isFetchingMovieDetails ? <Loader /> :
          clickedMovie ? (
            <MovieDetails
              clickedMovie={clickedMovie}
              onClickBtnBack={handleClickBtnBack}
              onSubmitWatchedMovie={handleSubmitWatchedMovie}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <History watchedMovies={watchedMovies} />
              <ul className="list list-movies">
                {watchedMovies.length > 0 &&
                  <WatchedMovies
                    watchedMovies={watchedMovies}
                    onClickBtnDelete={handleClickBtnDelete}
                    onClickMovie={handleClickMovie}
                  />
                }
              </ul>
            </>
          )}
      </ListBox>
    </main>
  )
}

export { Main }