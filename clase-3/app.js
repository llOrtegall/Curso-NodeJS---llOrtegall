import express from 'express'
import movies from "./movies.json" assert { type: "json" }
import crypto from "crypto";
import { validateMovie } from './Schemas/movies.js';

const app = express()

app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hola Mundo' })
})

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

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  /* const { title, genre, year, director, duration, rate, poster } = req.body
  TODO: Si algo llega sin datos
  if (!title || !genre || !year || !director || !duration || !rate || !poster) {
  return res.status(400).json({ message: 'Missing required fields' })
  */

  if(result.error){
    return res.status(400).json({error: JSON.parse(result.error.message)})
  }

  const newMovie = {
    id: crypto.randomUUID(),
    // title, genre, year, director, duration, rate: rate ?? 0, poster
    ...result.data
  }
  movies.push(newMovie)

  res.status(201).json({ message: 'Movie Created', source: newMovie })
})

const PORT = process.env.PORT ?? 3030

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
