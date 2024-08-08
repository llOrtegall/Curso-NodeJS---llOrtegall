const { readFile } = require('node:fs/promises');

async function init() {
  console.log('Leyendo archivo...');

  const text = await readFile('./archivo.txt', 'utf-8')
  console.log('primero texto: ', text);

  console.log('-- hacer cosas como Leyendo 2do archivo...');

  const text2 = await readFile('./archivo2.txt', 'utf-8')
  console.log('segundo texto: ', text2);
}

init();

// IIFE - immediately invoked function expression
(async () => {
  console.log('Leyendo archivo...');

  const text = await readFile('./archivo.txt', 'utf-8')
  console.log('primero texto: ', text);

  console.log('-- hacer cosas como Leyendo 2do archivo...');

  const text2 = await readFile('./archivo2.txt', 'utf-8')
  console.log('segundo texto: ', text2);
})()
