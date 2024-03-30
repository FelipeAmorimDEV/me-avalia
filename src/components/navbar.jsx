import { useEffect, useRef } from 'react'

const NavBar = ({ onSearchMovie, movies, detailsMovieRef }) => {
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current.elements.searchMovie.value.length > 0) {
      formRef.current.reset()
      detailsMovieRef.current()
    }
  }, [movies, detailsMovieRef])

  return (
    <nav className="nav-bar">
      <a href="/">
        <img src="logo-me-avalia.png" alt="Logo me avalia" className="logo" />
      </a>
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

export { NavBar }