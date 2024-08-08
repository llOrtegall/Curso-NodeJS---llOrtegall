const net = require('node:net');

function findAvailablePort(desiredport) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(desiredport, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port);
      });
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(desiredport + 1).then(port => resolve(port));
      } else {
        reject(err);
      }
    })
  });
}

module.exports = { findAvailablePort };