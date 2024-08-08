import { readFile } from 'node:fs/promises';

console.log('Leyendo archivo...');

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, text2]) => {
  console.log('primero texto: ', text);
  console.log('segundo texto: ', text2);
});

// const text = await readFile('./archivo.txt', 'utf-8')
// console.log('primero texto: ', text);

// console.log('-- hacer cosas como Leyendo 2do archivo...');

// const text2 = await readFile('./archivo2.txt', 'utf-8')
// console.log('segundo texto: ', text2);

