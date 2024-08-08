const path = require('node:path');

console.log(path.sep)

const filePath = path.join('/content', 'subfolder', 'test.txt');
console.log(filePath);

const base = path.basename('/content/subfolder/test.txt');
console.log(base);

const filename = path.extname('/content/subfolder/test.txt');
console.log(filename);