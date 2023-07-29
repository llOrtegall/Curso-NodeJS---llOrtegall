const http = require('node:http')

const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json', 'charset=utf8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('content-type', 'text/html', 'charset=utf8')
          return res.end('<h1> 404 Not Found</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(4000, () => {
  console.log('Server listening on port http://localhost:4000')
})
