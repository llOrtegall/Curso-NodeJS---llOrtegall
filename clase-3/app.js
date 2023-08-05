const express = require('express')
const movies = require('./movies.json')

const app = express()

app.disable('x-powered-by')

app.get('/movies', (req, res) => {
  res.json(movies)
})

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
