const { findAvailablePort } = require('./11.free-port.js')
const htpp = require('node:http')

console.log(process.env.PORT)

const desiredPort = process.env.PORT ?? 3030;

const server = htpp.createServer((req, res) => {
  console.log('Request received');
  res.end('Hola mundo');
});

findAvailablePort(desiredPort)
  .then(port => {
    console.log(port);
    
    server.listen(port, () => {
      console.log(`Server on port http://localhost:${port}`);
    });
  });
