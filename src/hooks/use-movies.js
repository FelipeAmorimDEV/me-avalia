import { useEffect, useState } from 'react'
import localforage from 'localforage'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'
import { useLoading } from '@/hooks/use-loading'

const useMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)
  const [isFetchingMovieDetails, setIsFetchingMovieDetails] = useLoading()

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
    
    setIsFetchingMovieDetails(true)
    request({
      url: `${baseUrl}&i=${currentClickedMovie.id}`,
      onSuccess: data => setClickedMovie({
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
      }),
      onFinally: () => setIsFetchingMovieDetails(false)
    })
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
    setClickedMovie,
    isFetchingMovieDetails
  }
}

export { useMovies }