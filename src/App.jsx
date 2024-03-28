import { useState, useEffect, useRef } from 'react'
import { NavBar } from '@/components/navbar'
import { Main } from '@/components/main'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'
import { useLoading } from '@/hooks/use-loading'

const App = () => {
  const [movies, setMovies] = useState([])
  const detailsMovieRef = useRef(null)
  const [isFetchingMovie, setIsFetchingMovie] = useLoading()

  useEffect(() => {
    setIsFetchingMovie(true)
    request({
      url: `${baseUrl}&s=the%20matrix`,
      onSuccess: data => setMovies(data.Search.map(movie => ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))),
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
      onSuccess: data => setMovies(data.Search.map(movie => ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))),
      onFinally: () => setIsFetchingMovie(false)
    })
  }

  return (
    <>
      <NavBar movies={movies} onSearchMovie={handleSearchMovie} detailsMovieRef={detailsMovieRef} />
      <Main movies={movies} detailsMovieRef={detailsMovieRef} isFetchingMovie={isFetchingMovie}/>
    </>
  )
}

export { App }
