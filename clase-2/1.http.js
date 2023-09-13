const http = require('http')

const PORT = process.env.PORT ?? 3200

const processRequest = (req, res) => {
  // console.log('request received', req.url)
  if (req.url === '/') {
    res.statusCode = 200 // ok
    res.setHeader('Content-Type', 'text/plain; charset=utf8')
    res.end('Bienvenido a mi página')
  }
}

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
