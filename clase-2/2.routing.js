const http = require('http')

const processRequest = (req, res) => {

}

const Server = http.createServer(processRequest)

Server.listen(3200, () => {
  console.log('Server listening on port http://localhost:3200')
})
