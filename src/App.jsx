import { useState, useEffect, useRef } from "react"

import { useMovies } from "./hooks/use-movies"

const getTotalMinutes = watchedMovies => watchedMovies
  .reduce((acc, item) => acc + (item.runtime === "N/A" ? 0 : +item.runtime.split(" ")[0]), 0)
const getMoviePoster = moviePoster => moviePoster === "N/A" ? "404-img.jpg" : moviePoster

const apiKey = import.meta.env.VITE_API_KEY

const NavBar = ({ onSearchMovie, movies, detailsMovieRef }) => {
  const formRef = useRef(null)

  useEffect(() => {
    if(formRef.current.elements.searchMovie.value.length > 0) {
      formRef.current.reset()
      detailsMovieRef.current(null)
    }
  }, [movies, detailsMovieRef])

  return (
    <nav className="nav-bar">
      <img src="logo-me-avalia.png" alt="Logo me avalia" className="logo" />
      <form ref={formRef} className="form-search" onSubmit={onSearchMovie}>
        <input
          type="text"
          name="searchMovie"
          placeholder="Buscar filmes..."
          autoFocus
          className="search"
        />
        <button type="submit" className="btn-search">
          Buscar
        </button>
      </form>
      <p className="num-results">
        <strong>{movies.length}</strong> Resultados
      </p>
    </nav>)
}

const ListBox = ({ children }) => <ul className='box'>{children}</ul>

const History = ({ watchedMovies }) => {
  return (
    <div className="history">
      <h2>Histórico</h2>
      <div>
        <p>
          <span>#️⃣</span> <span>{watchedMovies.length} filmes</span>
        </p>
        <p>
          <span>⏳</span> <span>{getTotalMinutes(watchedMovies)} min</span>
        </p>
      </div>
    </div>
  )
}

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

const MovieDetails = ({ onClickBtnBack, clickedMovie, onSubmitWatchedMovie }) => {
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
          <form
            className="form-rating"
            onSubmit={onSubmitWatchedMovie}
          >
            <p>Qual nota você dá para este filme?</p>
            <div>
              <select name="rating" defaultValue={clickedMovie.userRating ?? 0} key={crypto.randomUUID()}>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <button className="btn-add">{clickedMovie?.userRating ? "Alterar nota" : "+ Adicionar á lista"}</button>
            </div>
          </form>
        </div>
        <p><em>{clickedMovie.plot}</em></p>
        <p>Elenco: {clickedMovie.actors}</p>
        <p>Direção: {clickedMovie.director}</p>
      </section>
    </div>
  )
}

const Movies = ({ movies, onClickMovie }) => {
  return (
    movies.map((movie) => (
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

const Main = ({ movies, detailsMovieRef }) => {
  const { 
    clickedMovie, 
    watchedMovies, 
    handleClickMovie, 
    handleSubmitWatchedMovie, 
    handleClickBtnBack, 
    handleClickBtnDelete,
    setClickedMovie
  } = useMovies(apiKey)

  detailsMovieRef.current = setClickedMovie
 
  return (
    <main className="main">
      <ListBox>
        <ul className="list list-movies">
          {movies.length > 0 && <Movies movies={movies} onClickMovie={handleClickMovie}/> }
        </ul>
      </ListBox>
      <ListBox>
        {clickedMovie ? (
          <MovieDetails
            clickedMovie={clickedMovie}
            onClickBtnBack={handleClickBtnBack}
            onSubmitWatchedMovie={handleSubmitWatchedMovie}
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

const App = () => {
  const [movies, setMovies] = useState([])

  const detailsMovieRef = useRef(null)

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=the%20matrix`)
      .then((r) => r.json())
      .then((data) => setMovies(data.Search.map((movie) => 
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster}))))
      .catch(console.log)
  }, [])

  const handleSearchMovie = e => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchMovie.value}`)
      .then((r) => r.json())
      .then((data) => setMovies(data.Search.map((movie) => 
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster}))))
      .catch(console.log)
  }

  return (
    <>
      <NavBar movies={movies} onSearchMovie={handleSearchMovie} detailsMovieRef={detailsMovieRef}/>
      <Main movies={movies} detailsMovieRef={detailsMovieRef}/>
    </>
  )
}

export { App }
