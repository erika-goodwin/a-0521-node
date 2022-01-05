const fs = require("fs");
const path = require("");

//create a folder
fs.mkdir(path.join(__dirname, "test"), {}, (err) => {
  if (err) throw err;
  console.log("Folder created");
});

//create and write to file
fs.writeFile(
  path.join(__dirname, "test", "hello.txt"),
  "Hello there",
  (err) => {
    if (err) throw err;
    console.log("File created");
  }
);

//append to file
// fs.writeFile(path.join(__dirname, "test", "hello.txt"), "Heya!", (err) => {
//   if (err) throw err;
//   console.log("File created");

//   //file append
//   fs.appendFile(
//     path.join(__dirname, "test", "hello.txt"),
//     "hello Again!",
//     (err) => {
//       if (err) throw err;
//       console.log("file appended....");
//     }
//   );
// });

//read
fs.readFile(`reference/test/hello.txt`, (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.rename(
  path.join(__dirname, "test", "hello.txt"),
  path.join(__dirname, "test", "helloWorld.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log("file renamed");
  }
);
