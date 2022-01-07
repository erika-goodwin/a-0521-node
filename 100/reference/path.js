const path = require('path')

//basename
console.log('basename: ', path.basename(__filename));

//directory
console.log('directory: ', path.dirname(__filename));

//file extension
console.log('file extension: ', path.extname(__filename));

//create a path object
console.log('path object: ', path.parse(__filename));

//concatenate paths
//../test/hello.html

console.log('concat: ', path.join('..','test','hello.html'));