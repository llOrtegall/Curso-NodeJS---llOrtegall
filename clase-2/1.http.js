import { createServer } from 'node:http'

const PORT = process.env.PORT ?? 4000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html ; charset=utf-8')

  if (req.url === '/') {
    //* Codigo de Estado
    res.statusCode = 200 //* OK */
    //* Enviar Cabecera
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // **OK
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
