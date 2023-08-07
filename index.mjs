// .js por defecto utiliza CommonJS
// . mjs para utilizar ES modules
// . cjs para utilizar CommonJS

import { sum, mult, sub } from './sum.mjs';

console.log(sum(1, 2));
console.log(sub(1, 2));
console.log(mult(1, 2));
