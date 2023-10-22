import express from 'express'
import movies from "./movies.json" assert { type: "json" }
import crypto from "crypto";
import { validateMovie, validatePartialMovie } from './Schemas/movies.js';

const app = express()

app.disable('x-powered-by')
app.use(express.json())

const ACCEPTED_ORIGINS = [
  'http://localhost:3030',
  'http://localhost:8080',
  'http://localhost:1234',
  'http://movies.com'
]

// TODO: test 
app.get('/', (req, res) => {
  res.json({ message: 'Hola Mundo' })
})
// TODO: Recupera todas las peliculas
app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  }
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
    id: crypto.randomUUID(),
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
    return res.status(404).json({ message: "Movie no found" })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  return res.json(updateMovie)

})

const PORT = process.env.PORT ?? 3030

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
