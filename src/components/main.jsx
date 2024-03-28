import { useMovies } from "../hooks/use-movies"
import { History } from './history'
import { WatchedMovies } from "./watched-movies"
import { Movies } from "./movies"
import { MovieDetails } from "./movie-details"

const ListBox = ({ children }) => <ul className='box'>{children}</ul>

const Main = ({ movies, detailsMovieRef }) => {
  const {
    clickedMovie,
    watchedMovies,
    handleClickMovie,
    handleSubmitWatchedMovie,
    handleClickBtnBack,
    handleClickBtnDelete,
    setClickedMovie
  } = useMovies()

  detailsMovieRef.current = setClickedMovie

  return (
    <main className="main">
      <ListBox>
        <ul className="list list-movies">
          {movies.length > 0 && <Movies movies={movies} onClickMovie={handleClickMovie} />}
        </ul>
      </ListBox>
      <ListBox>
        {clickedMovie ? (
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