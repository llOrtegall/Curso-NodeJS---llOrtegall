const fs = require('node:fs');
const { promisify } = require('node:util');

// exite forma de pasar el callback a promesa este solo es un ejemplo
const readFilePromise = promisify(fs.readFile);

console.log('Leyendo archivo...');

fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  console.log(text);
});

console.log('-- hacer cosas como Leyendo 2do archivo...');

fs.readFile('./archivo2.txt', 'utf-8', (err, text2) => {
  console.log(text2);
});
