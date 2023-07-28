const http = require('node:http')

const PORT = process.env.PORT ?? 4000

const processRequest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200 // ** OK **
    res.setHeader('Content-Type', 'text/plain')
    res.end('Bienvenido a mi página de inicio')
  }
}

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
