import { createServer } from 'node:http'

const PORT = process.env.PORT ?? 4000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html ; charset=utf-8')

  if (req.url === '/') {
    res.end('<h1>Bienvenido a mi página de inicio</h1>')
  } else if (req.url === '/contacto') {
    res.end('Contacto')
  } else {
    res.statusCode = 404 // **NOT FOUND **
    res.end('<h1>404</h1> <p>pagina no encontrada </p>')
  }
}

const server = createServer(processRequest)

server.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

// SPA
