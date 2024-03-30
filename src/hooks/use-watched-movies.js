import { useEffect, useState } from 'react'
import localforage from 'localforage'

const useWatchedMovies = ({ setClickedMovie, clickedMovie, watchedMoviesRef }) => {
  const [watchedMovies, setWatchedMovies] = useState([])

  watchedMoviesRef.current = watchedMovies

  useEffect(() => {
    localforage.setItem('meAvalia', watchedMovies)
      .catch(error => alert(error.message))
  }, [watchedMovies])

  useEffect(() => {
    localforage.getItem('meAvalia')
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

  return { watchedMovies, handleSubmitWatchedMovie, handleClickBtnBack, handleClickBtnDelete }
}

export { useWatchedMovies }