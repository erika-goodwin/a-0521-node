const http = require("http");

//create server object
http
  .createServer((req, res) => {
    //write a response
    res.write("hello world");
    res.end(); //send this back to the client
  })
  .listen(5000, () => console.log("server is running"));
