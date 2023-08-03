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
})

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})