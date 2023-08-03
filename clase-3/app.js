const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

// TODO: los recursis que sean movies se idenfica con /movies
app.get('/movies', (req, res) => {
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

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})