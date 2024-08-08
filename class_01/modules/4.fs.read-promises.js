const fs = require('node:fs/promises');

console.log('Leyendo archivo...');

fs.readFile('./archivo.txt', 'utf-8')
  .then((data) => {
    console.log('primero texto: ', data);
  })

console.log('-- hacer cosas como Leyendo 2do archivo...');

fs.readFile('./archivo2.txt', 'utf-8')
  .then((data) => {
    console.log('segundo texto: ', data);
  })
