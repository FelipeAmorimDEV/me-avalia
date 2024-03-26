import { useState, useEffect } from "react"

const apiKey = import.meta.env.VITE_API_KEY

const useMovies = () => {
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

  return { 
          movies, 
          clickedMovie, 
          watchedMovies, 
          handleClickMovie, 
          handleSubmitWatchedMovie, 
          handleSearchMovie,
          handleClickBtnBack,
          handleClickBtnDelete
        }
}

export { useMovies }