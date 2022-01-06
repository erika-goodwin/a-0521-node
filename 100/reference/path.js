const path = require("path");

//basename
console.log("basename: ", path.basename(__filename));

//directory
console.log("directory: ", path.dirname(__filename));

//file extension
console.log("file extension: ", path.extname(__filename));

//create a path object
console.log("Path object: ", path.parse(__filename));

//============console====================
// Erika-Hashizumes-MacBook-Pro:101 hashidzumeerika$ node reference/path.js
// basename:  path.js
// directory:  /Users/hashidzumeerika/VSCODE/a-0521-node/101/reference
// file extension:  .js
// Path object:  {
//   root: '/',
//   dir: '/Users/hashidzumeerika/VSCODE/a-0521-node/101/reference',
//   base: 'path.js',
//   ext: '.js',
//   name: 'path'
// }
//==============console==================

//concatenate paths
//../test/helo.html

console.log("concat: ", path.join("..", "text", "hello.html"));
//concat:  ../text/hello.html