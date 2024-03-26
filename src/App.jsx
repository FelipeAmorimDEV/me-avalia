import { useEffect, useState } from 'react'

function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/FelipeAmorimDEV/fake-data/main/fake-movies.json',
    )
      .then((r) => r.json())
      .then((data) =>
        setMovies(
          data.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            released: movie.Released,
            runtime: movie.Runtime,
            genre: movie.Genre,
            director: movie.Director,
            actors: movie.Actors,
            plot: movie.Plot,
            poster: movie.Poster,
            imdbRating: movie.imdbRating,
          })),
        ),
      )
  }, [])

  const handleClickBtnMovie = (movie) =>
    setSelectedMovie((sm) => (sm?.id === movie.id ? null : movie))

  const handleClickBtnBack = () => setSelectedMovie(null)

  return (
    <>
      <nav className="nav-bar">
        <img src="logo-me-avalia.png" alt="Logo me avalia" className="logo" />
        <form className="form-search">
          <input
            type="text"
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
                  <form className="form-rating">
                    <p>Qual nota você dá para este filme?</p>
                    <div>
                      <select name="rating" defaultValue={1}>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <button className="btn-add">+ Adicionar á lista</button>
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
                    <span>#️⃣</span> <span>0 filmes</span>
                  </p>
                  <p>
                    <span>⏳</span> <span>0 min</span>
                  </p>
                </div>
              </div>
              <ul className="list list-movies">
                <li>
                  <img
                    src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
                    alt="Poster de The Matrix"
                  />
                  <h3>The Matrix</h3>
                  <div>
                    <p>
                      <span>⭐</span>
                      <span>8.7</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>9.5</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>136 min</span>
                    </p>
                    <button className="btn-delete">X</button>
                  </div>
                </li>
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export { App }
