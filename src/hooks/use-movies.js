import { useState } from "react"

const useMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)

  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickBtnDelete = movieId =>
    setWatchedMovies(watchedMovies.filter((movie) => movie.id !== movieId))
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

  return { 
    watchedMovies, 
    clickedMovie, 
    handleClickMovie, 
    handleSubmitWatchedMovie, 
    handleClickBtnBack, 
    handleClickBtnDelete 
  }
}

export { useMovies }