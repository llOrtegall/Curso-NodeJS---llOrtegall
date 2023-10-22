import express from 'express'
import { moviesRouter } from './Routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(corsMiddleware())

app.use('/movies', moviesRouter)

app.get('/', (req, res) => {
  // TODO: test
  res.json({ message: 'Hola Mundo' })
})

const PORT = process.env.PORT ?? 3030

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
