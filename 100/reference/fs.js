const fs = require('fs')
const path = require('path')

//create a folder
// fs.mkdir(path.join(__dirname, 'test'), {}, (err) => {
//     if(err) throw err
//     console.log("Folder created");
// })

//create and write to file
// fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'heya!', (err) => {
//     if(err) throw err
//     console.log("File created");
// })

//append to file
// fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'heya!', (err) => {
//     if(err) throw err
//     console.log("File created");

//     //File append
//     fs.appendFile(path.join(__dirname, 'test', 'hello.txt'), 'Hello Again!', (err) => {
//         if(err) throw err
//         console.log('File appended.....');
//     })
// })

//read file
fs.readFile('reference/test/hello.txt', 'utf8' ,(err, data) => {
    if(err) throw err
    console.log(data);
})

fs.rename(
    path.join(__dirname, 'test', 'hello.txt'),
    path.join(__dirname, 'test', 'helloworld.txt'),
    (err, data) => {
        if(err) throw err
        console.log('File renamed');
    }
)