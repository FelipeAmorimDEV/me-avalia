import { useEffect, useState } from "react"
import { apiKey } from "@/App"
import localforage from "localforage"

const useMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)

  useEffect(() => {
    localforage.setItem("meAvalia", watchedMovies)
      .catch(error => alert(error.message))
  }, [watchedMovies])

  useEffect(() => {
    localforage.getItem("meAvalia")
      .then(value => {
        if (value) {
          setWatchedMovies(value)
        }
      })
      .catch(error => alert(error.message))
  }, [])
  
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
  
  const handleSubmitWatchedMovie = rating => {
    setWatchedMovies((wm) => {
      const isMovieAlreadyWatched = wm.some((movie) => movie.id === clickedMovie.id)
      return isMovieAlreadyWatched 
      ? wm
        .map((movie) => movie.id === clickedMovie.id ? { ...movie, userRating: rating } : movie)
      : [...wm, { ...clickedMovie, userRating: rating }]
    })
    setClickedMovie(null)
  }

  return { 
    watchedMovies, 
    clickedMovie, 
    handleClickMovie, 
    handleSubmitWatchedMovie, 
    handleClickBtnBack, 
    handleClickBtnDelete,
    setClickedMovie
  }
}

export { useMovies }