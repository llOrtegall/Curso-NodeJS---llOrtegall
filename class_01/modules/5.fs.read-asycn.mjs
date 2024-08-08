import { readFile } from 'node:fs/promises';

console.log('Leyendo archivo...');

const text = await readFile('./archivo.txt', 'utf-8')
console.log('primero texto: ', text);

console.log('-- hacer cosas como Leyendo 2do archivo...');

const text2 = await readFile('./archivo2.txt', 'utf-8')
console.log('segundo texto: ', text2);

