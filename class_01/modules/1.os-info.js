const os = require('node:os');

console.log(os.platform());
console.log(os.release());
console.log(os.arch());
console.log(os.cpus());
console.log('memoria ram total: ', os.totalmem()  /1024 /1024 );
console.log('memoria ram libre: ', os.freemem()  /1024 /1024 );
console.log('uptime: ', os.uptime() / 60 / 60);
