import { useState, useEffect, useRef } from "react"
import { NavBar } from "./components/navbar"
import { Main } from "./components/main"

const apiKey = import.meta.env.VITE_API_KEY

const App = () => {
  const [movies, setMovies] = useState([])
  const detailsMovieRef = useRef(null)

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=the%20matrix`)
      .then((r) => r.json())
      .then((data) => setMovies(data.Search.map((movie) =>
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))))
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
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))))
      .catch(console.log)
  }

  return (
    <>
      <NavBar movies={movies} onSearchMovie={handleSearchMovie} detailsMovieRef={detailsMovieRef} />
      <Main movies={movies} detailsMovieRef={detailsMovieRef} />
    </>
  )
}

export { App, apiKey }
