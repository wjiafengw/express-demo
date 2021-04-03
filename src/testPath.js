const path = require('path');

//这个就是node xxx.js，xxx.js前面的绝对路径
console.log("__dirname",__dirname);

console.log("1-1",path.join(__dirname,'./a'));
console.log("1-2",path.resolve(__dirname,'./a'));

console.log("2-1",path.join(__dirname,'../a'));
console.log("2-2",path.resolve(__dirname,'../a'));


console.log("3-1",path.join(__dirname,'/a'));
console.log("3-2",path.resolve(__dirname,'/a'));

console.log("4-1",path.join('/a','/b'))
console.log("4-2",path.resolve('/a', '/b'))

console.log("5-1",path.join("a", "b1", "..", "b2"));
console.log("5-2",path.resolve("a", "b1", "..", "b2"))

console.log("6-1",path.join("a", "b1", "/", "b2"));
console.log("6-2",path.resolve("a", "b1", "/", "b2"))