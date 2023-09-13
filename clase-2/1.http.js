const http = require('node:http')
const fs = require('node:fs')

const PORT = process.env.PORT ?? 3200

const processRequest = (req, res) => {
  // console.log('request received', req.url)

  res.setHeader('Content-Type', 'text/html; charset=utf8')

  if (req.url === '/') {
    res.statusCode = 200 // ok
    res.end('<h3>Bienvenido a mi página De Inicio</h3>')
  } else if (req.url === '/imagen.png') {
    fs.readFile('./foto.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1> Error Server Internal 500</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // ok
    res.end('<h3>Contactos</h3>')
  } else {
    res.statusCode = 404 //
    res.end('<h3>Error 404 Página No Encontrada</h3>')
  }
}

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
