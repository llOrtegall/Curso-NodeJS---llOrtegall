// const fs = require('node:fs')

// console.log('Leyendo el primer archivo');
// const text = fs.readFileSync('./archivo.txt', 'utf-8')

// console.log(text);

// console.log('Leyendo el segundo archivo');
// const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')

// console.log(text2);


const fs = require('node:fs')

console.log('Leyendo el primer archivo');
fs.readFile('./archivo.txt', 'utf-8', (err, data) => {
  console.log('Primer texto:' + data);
})

console.log('-----> Haciendo cosas mientras termina el primero');

console.log('Leyendo el segundo archivo');
fs.readFile('./archivo2.txt', 'utf-8', (err, data) => {
  console.log('Segundo texto:' + data);
})