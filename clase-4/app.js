import { validateMovie, validatePartialMovie } from './Schemas/movies.js'
import { randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'
import express from 'express'
import cors from 'cors'

// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'))

const require = createRequire(import.meta.url)
const movies = require('./movies.json')

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:3030',
      'http://localhost:8080',
      'http://localhost:1234',
      'http://movies.com'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by Cors'))
  }
}))

// TODO: test
app.get('/', (req, res) => {
  res.json({ message: 'Hola Mundo' })
})
// TODO: Recupera todas las peliculas
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})
// TODO: Recuperar pelicula por ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})
// TODO: Crear pelicula y validar datos recibidos
app.post('/movies', (req, res) => {
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
// TODO: Actuliazando las pelicula y validar datos recibidos
app.patch('/movies/:id', (req, res) => {
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

app.delete('/movies/:id', (req, res) => {
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

const PORT = process.env.PORT ?? 3030

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
