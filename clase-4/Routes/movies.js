import { Router } from 'express'
import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../Schemas/movies.js'

const movies = readJSON('./movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json({ message: 'Movie Created', source: newMovie })
})

moviesRouter.patch('/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const movieIndex = movies.findIndex(m => m.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie no found' })
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  return res.json(updateMovie)
})

moviesRouter.delete('/', (req, res) => {
  const { id } = req.params
  try {
    const movieIndex = movies.findIndex(m => m.id === id)
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    movies.splice(movieIndex, 1)
    return res.status(204).json({ message: 'Movie deleted' })
  } catch (error) {
    console.log(error)
  }
})
