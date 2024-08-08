const { findAvailablePort } = require('./11.free-port.js')
const htpp = require('node:http')

const server = htpp.createServer((req, res) => {
  console.log('Request received');
  res.end('Hola mundo');
});

findAvailablePort(3000)
  .then(port => {
    console.log(port);
    
    server.listen(port, () => {
      console.log(`Server on port http://localhost:${port}`);
    });
  });
