import { useReducer, useEffect, useRef } from 'react'
import { NavBar } from '@/components/navbar'
import { Main } from '@/components/main'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'
import { useLoading } from '@/hooks/use-loading'

const reducer = (state, action) => ({
  init_fetch: {...state, movies: action.movie?.Search.map( m => ({ id: m.imdbID, title: m.Title, year: m.Year, poster: m.Poster }))},
  searched_movie: {...state, movies: action.movie?.Search.map( m => ({ id: m.imdbID, title: m.Title, year: m.Year, poster: m.Poster }))}
})[action.type] || state

const App = () => {
  const [state, dispatch] = useReducer(reducer, { movies: [] })
  const detailsMovieRef = useRef(null)
  const [isFetchingMovie, setIsFetchingMovie] = useLoading()

  useEffect(() => {
    setIsFetchingMovie(true)
    request({
      url: `${baseUrl}&s=the%20matrix`,
      onSuccess: data => dispatch({type: 'init_fetch', movie: data}),
      onFinally: () => setIsFetchingMovie(false)
    })
  }, [])

  const handleSearchMovie = e => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    setIsFetchingMovie(true)
    request({
      url: `${baseUrl}&s=${searchMovie.value}`,
      onSuccess: data => dispatch({ type: 'searched_movie', movie: data }),
      onFinally: () => setIsFetchingMovie(false)
    })
  }

  return (
    <>
      <NavBar movies={state.movies} onSearchMovie={handleSearchMovie} detailsMovieRef={detailsMovieRef} />
      <Main movies={state.movies} detailsMovieRef={detailsMovieRef} isFetchingMovie={isFetchingMovie}/>
    </>
  )
}

export { App }
