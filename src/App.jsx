import { useEffect, useState } from 'react'

const getTotalMinutes = watchedMovies => watchedMovies
  .reduce((acc, item) => acc + (item.runtime === "N/A" ? 0 : +item.runtime.split(" ")[0]), 0)

const apiKey = import.meta.env.VITE_API_KEY

const NavBar = ({ onSearchMovie, movies }) => {
  return (
    <nav className="nav-bar">
      <img src="logo-me-avalia.png" alt="Logo me avalia" className="logo" />
      <form className="form-search" onSubmit={onSearchMovie}>
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

const ListBox = ({ children }) => {
  return <ul className='box'>{children}</ul>
}

const App = () => {
  const [movies, setMovies] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)
  const [watchedMovies, setWatchedMovies] = useState([])

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=the%20matrix`)
      .then((r) => r.json())
      .then((data) => setMovies(data.Search.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }))))
      .catch(console.log)
  }, [])

  const handleClickMovie = currentClickedMovie => {
    const prevClickedMovie = clickedMovie
    if (prevClickedMovie?.id === currentClickedMovie.id) {
      setClickedMovie(null)
      return
    }

    const watchedMovie = watchedMovies
      .find((watchedMovie) => watchedMovie.id === currentClickedMovie.id)

    if (watchedMovie) {
      setClickedMovie(watchedMovie)
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${currentClickedMovie.id}`)
      .then(r => r.json())
      .then(data => setClickedMovie(
        {
          id: data.imdbID,
          title: data.Title,
          year: data.Year,
          released: data.Released,
          runtime: data.Runtime,
          genre: data.Genre,
          director: data.Director,
          actors: data.Actors,
          poster: data.Poster,
          imdbRating: data.imdbRating,
          plot: data.Plot
        }
      ))
      .catch(console.log)
  }

  const handleSubmitWatchedMovie = e => {
    e.preventDefault()
    const { rating } = e.target.elements

    const isMovieInWatchedList = watchedMovies.some((movie) => movie.id === clickedMovie.id)

    if (isMovieInWatchedList) {
      setWatchedMovies(wm => wm.map(movie =>
        movie.id === clickedMovie.id ? { ...movie, userRating: +rating.value } : movie
      ))
      setClickedMovie(null)

      return
    }

    setWatchedMovies((wm) => [...wm, { ...clickedMovie, userRating: +rating.value }])
    setClickedMovie(null)
  }

  const handleSearchMovie = e => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchMovie.value}`)
      .then((r) => r.json())
      .then((data) => setMovies(data.Search.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }))))
      .catch(console.log)
  }

  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickBtnDelete = movieId =>
    setWatchedMovies(watchedMovies.filter((movie) => movie.id !== movieId))

  return (
    <>

      <NavBar movies={movies} onSearchMovie={handleSearchMovie} />
      <main className="main">
        <ListBox>
          <ul className="list list-movies">
            {movies.length > 0 &&
              movies.map((movie) => (
                <li key={movie.id} onClick={() => handleClickMovie(movie)}>
                  <img src={movie.poster} alt={`Poster de ${movie.title}`} />
                  <h3>{movie.title}</h3>
                  <p>
                    <span>📅</span>
                    <span>{movie.year}</span>
                  </p>
                </li>
              ))}
          </ul>
        </ListBox>
        <ListBox>
          {clickedMovie ? (
            <div className="details">
              <header>
                <button className="btn-back" onClick={handleClickBtnBack}>
                  &larr;
                </button>
                <img
                  src={clickedMovie.poster}
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
                    onSubmit={handleSubmitWatchedMovie}
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
                <p>
                  <em>{clickedMovie.plot}</em>
                </p>
                <p>Elenco: {clickedMovie.actors}</p>
                <p>Direção: {clickedMovie.director}</p>
              </section>
            </div>
          ) : (
            <>
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
              <ul className="list list-movies">
                {watchedMovies.length > 0 &&
                  watchedMovies.map((watchedMovie) => (
                    <li key={watchedMovie.id} onClick={() => handleClickMovie(watchedMovie)}>
                      <img
                        src={watchedMovie.poster}
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
                            handleClickBtnDelete(watchedMovie.id)
                          }
                          }
                        >
                          X
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </ListBox>
      </main>
    </>
  )
}

export { App }
