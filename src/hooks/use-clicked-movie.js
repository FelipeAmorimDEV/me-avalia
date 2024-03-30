import { useState } from 'react'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'
import { useLoading } from '@/hooks/use-loading'

const useClickedMovie = ({ watchedMoviesRef }) => {
  const [clickedMovie, setClickedMovie] = useState(null)
  const [isFetchingMovieDetails, setIsFetchingMovieDetails] = useLoading()

  const handleClickMovie = currentClickedMovie => {
    const prevClickedMovie = clickedMovie
    if (prevClickedMovie?.id === currentClickedMovie.id) {
      setClickedMovie(null)
      return
    }

    const watchedMovie = watchedMoviesRef.current
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

  return { 
    clickedMovie, 
    handleClickMovie, 
    setClickedMovie,
    isFetchingMovieDetails
  }
}

export { useClickedMovie }