const express = require('express')
const ditto = require('./pokemon/ditto.json')

const PORT = process.env.PORT || 4000

const app = express()
//* es buena pradctica quitar esta cabecera por seguridad
app.disable('x-powered-by')

app.use((req, res, next) => {
  // TODO: trackear la request a la base de datos
  // TODO: revisar si el usuario tiene cookies
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la información en la req.body
    req.body = data
    next()
  })

  next()
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).json(data)
  })
})

// TODO: en lo posible que sea la ultima linea
app.use((req, res) => {
  res.status(404).send('<h1>Not Found: 404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
