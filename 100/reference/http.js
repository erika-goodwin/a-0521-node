const http = require('http')

//create server object
http.createServer((req, res) => {
    console.log(req)
    //write a response
    res.write('Hello World!')
    res.end()
}).listen(5000, () => console.log("Server is running!"))

