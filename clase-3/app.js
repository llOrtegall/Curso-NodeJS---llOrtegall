const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie } = require('./schemas/movies')

const app = express()
app.disable('x-powered-by')
app.use(express.json())


// TODO: los recursis que sean movies se idenfica con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filterMovies = movies.filter(
      movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
    )
    return res.json(filterMovies)
  }
  res.json(movies)
})


app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(m => m.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({
    error: 'Movie not found'
  })
  res
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    res.status(404).json({ error: JSON.parse(result.error) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...newMovie.data
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})