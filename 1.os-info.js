const os = require('node:os');

console.log('Información del sistema operativo');


console.log('Nombre del sistema operativo', os.platform());
console.log('Versión del sistema operativo', os.release());
console.log('Arquitetura del sistema', os.arch());
console.log('CPUs ', os.cpus());
console.log('Memoria libre', os.freemem() / 1024 / 1024);
console.log('Memoria Total', os.totalmem() / 1024 / 1024);
console.log('Uptime', os.uptime() / 60 / 60);