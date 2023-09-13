const http = require('http');

const PORT = process.env.PORT ?? 3200;

const Server = http.createServer((req, res) => {
  console.log('request received');
  res.end('Hola Mundo');
});

Server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});