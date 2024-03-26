function App() {
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
          <strong>5</strong> Resultados
        </p>
      </nav>

      <main className="main">
        <div className="box">
          <ul className="list list-movies">
            <li>
              <img
                src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
                alt="Poster de The Matrix"
              />
              <h3>The Matrix</h3>
              <p>
                <span>📅</span>
                <span>1999</span>
              </p>
            </li>
            <li>
              <img
                src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
                alt="Poster de The Matrix"
              />
              <h3>The Matrix</h3>
              <p>
                <span>📅</span>
                <span>1999</span>
              </p>
            </li>
            <li>
              <img
                src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
                alt="Poster de The Matrix"
              />
              <h3>The Matrix</h3>
              <p>
                <span>📅</span>
                <span>1999</span>
              </p>
            </li>
          </ul>
        </div>
        <div className="box">
          {/* <div className="history">
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
          </ul> */}
          <div className="details">
            <header>
              <button className="btn-back">&larr;</button>
              <img
                src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
                alt="Poster de The Matrix"
              />
              <div className="details-overview">
                <h2>The Matrix</h2>
                <p>31 Mar 1999 &bull; 136 min</p>
                <p>Action, Sci-Fi</p>
                <p>
                  <span>⭐</span>8.7 IMDb rating
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
                <em>
                  When a beautiful stranger leads computer hacker Neo to a
                  forbidding underworld, he discovers the shocking truth--the
                  life he knows is the elaborate deception of an evil
                  cyber-intelligence.
                </em>
              </p>
              <p>Elenco: Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss</p>
              <p>Direção: Lana Wachowski, Lilly Wachowski</p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

export { App }
