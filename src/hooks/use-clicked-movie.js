import { useReducer } from 'react'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'
import { useLoading } from '@/hooks/use-loading'

const createMovieElement = data => ({
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
})

const reducer = (state, action) => ({
  dismissed_movie: { ...state, clickedMovie: null },
  fetched_movie: { ...state, clickedMovie: action?.movie && createMovieElement(action.movie) },
  set_watched_movie: { ...state, clickedMovie: action.movie }
})[action.type] || state

const useClickedMovie = ({ watchedMoviesRef }) => {
  const [state, dispatch] = useReducer(reducer, { clickedMovie: null })
  const [isFetchingMovieDetails, setIsFetchingMovieDetails] = useLoading()

  const resetClickedMovie = () => dispatch({ type: 'dismissed_movie'})

  const handleClickMovie = currentClickedMovie => {
    const prevClickedMovie = state.clickedMovie
    if (prevClickedMovie?.id === currentClickedMovie.id) {
      resetClickedMovie()
      return
    }

    const watchedMovie = watchedMoviesRef.current
      .find((watchedMovie) => watchedMovie.id === currentClickedMovie.id)

    if (watchedMovie) {
      dispatch({ type: 'set_watched_movie', movie: watchedMovie })
      return
    }
    
    setIsFetchingMovieDetails(true)
    request({
      url: `${baseUrl}&i=${currentClickedMovie.id}`,
      onSuccess: data => dispatch({ type: 'fetched_movie', movie: data }),
      onFinally: () => setIsFetchingMovieDetails(false)
    })
  }

  return { 
    clickedMovie: state.clickedMovie, 
    handleClickMovie, 
    resetClickedMovie,
    isFetchingMovieDetails
  }
}

export { useClickedMovie }