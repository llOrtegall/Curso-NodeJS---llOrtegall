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


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})