import {  useState } from 'react'

function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [watchedMovies, setWatchedMovies] = useState([])
  

  const apiKey = import.meta.env.VITE_API_KEY

  const handleClickBtnMovie = (movie) => {
    if (selectedMovie?.id === movie.id) {
      return setSelectedMovie(null)
    }

    const watchedMovie = watchedMovies.find((m) => m.id === movie.id)
    
    if (watchedMovie) {
      return setSelectedMovie(watchedMovie)
    }

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.id}`)
      .then(r => r.json())
      .then(data => setSelectedMovie(
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
    
  const handleClickBtnBack = () => setSelectedMovie(null)
  const handleSubmitMovieRating = (e) => {
    e.preventDefault()
    const { rating } = e.target.elements

    const isMovieInWatchedList = watchedMovies.some((movie) => selectedMovie.id === movie.id) 
    
    if (isMovieInWatchedList) {
      setWatchedMovies((wm) => wm.map((movie) => movie.id === selectedMovie.id 
        ? {...movie, userRating: +rating.value} 
        : movie
      ))
      setSelectedMovie(null)

      return
    }

    setWatchedMovies((wm) => [
      ...wm,
      { ...selectedMovie, userRating: +rating.value },
    ])
    setSelectedMovie(null)
  }
  const handleClickBtnDeleteMovie = (movieId) =>
    setWatchedMovies(watchedMovies.filter((movie) => movie.id !== movieId))

  const handleSearchMovie = (e) => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.length < 2) {
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

  // eslint-disable-next-line
  const watchedMoviesRuntime = watchedMovies
    .reduce((acc, movie) => (acc += +movie?.runtime.replace(' min', '')),0)

  return (
    <>
      <nav className="nav-bar">
        <img src="logo-me-avalia.png" alt="Logo me avalia" className="logo" />
        <form className="form-search" onSubmit={handleSearchMovie}>
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
      </nav>

      <main className="main">
        <div className="box">
          <ul className="list list-movies">
            {movies.length > 0 &&
              movies.map((movie) => (
                <li key={movie.id} onClick={() => handleClickBtnMovie(movie)}>
                  <img src={movie.poster} alt={`Poster de ${movie.title}`} />
                  <h3>{movie.title}</h3>
                  <p>
                    <span>📅</span>
                    <span>{movie.year}</span>
                  </p>
                </li>
              ))}
          </ul>
        </div>
        <div className="box">
          {selectedMovie ? (
            <div className="details">
              <header>
                <button className="btn-back" onClick={handleClickBtnBack}>
                  &larr;
                </button>
                <img
                  src={selectedMovie.poster}
                  alt={`Poster de ${selectedMovie.title}`}
                />
                <div className="details-overview">
                  <h2>{selectedMovie.title}</h2>
                  <p>
                    {selectedMovie.released} &bull; {selectedMovie.runtime}
                  </p>
                  <p>{selectedMovie.genre}</p>
                  <p>
                    <span>⭐</span>
                    {selectedMovie.imdbRating} IMDb rating
                  </p>
                </div>
              </header>
              <section>
                <div className="rating">
                  <form
                    className="form-rating"
                    onSubmit={handleSubmitMovieRating}
                  >
                    <p>Qual nota você dá para este filme?</p>
                    <div>
                      <select name="rating" defaultValue={selectedMovie.userRating ?? 0} key={crypto.randomUUID()}>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <button className="btn-add">{selectedMovie?.userRating ? "Alterar nota" : "+ Adicionar á lista"}</button>
                    </div>
                  </form>
                </div>
                <p>
                  <em>{selectedMovie.plot}</em>
                </p>
                <p>Elenco: {selectedMovie.actors}</p>
                <p>Direção: {selectedMovie.director}</p>
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
                    <span>⏳</span> <span>{watchedMoviesRuntime} min</span>
                  </p>
                </div>
              </div>
              <ul className="list list-movies">
                {watchedMovies.length > 0 &&
                  watchedMovies.map((watchedMovie) => (
                    <li key={watchedMovie.id} onClick={() => handleClickBtnMovie(watchedMovie)}>
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
                          onClick={(e) =>{
                            e.stopPropagation()
                            handleClickBtnDeleteMovie(watchedMovie.id)
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
        </div>
      </main>
    </>
  )
}

export { App }
