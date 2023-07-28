const http = require("node:http");

const PORT = process.env.PORT || 1234;

const server = http.createServer((req, res) => {
  console.log("request received");
  res.end("Hello World");
});

server.listen(() => {
  console.log(`server listening on port http://localhost:$${PORT}`);
});
