// console.log("Hello from NodeJS")

// const Person = require('./person')
// const person1 = new Person('Hoge', 20)
// person1.greeting()

const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  // if(req.url === '/home'){
  //     res.setHeader('Content-Type', 'text/html')
  //     res.write('<html>')
  //     res.write('<head><title>Home page</title></head>')
  //     res.write('<body>')
  //     res.write('<h1>Hola!</h1>')
  //     res.write('</h1>')
  //     res.write('</html>')
  //     return res.end()
  // }

  //build the file path
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  )

  //extension of the file
  let extname = path.extname(filePath)

  //initial content type
  let contentType = 'text/html'

  //check for ext and set content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
  }

  //check if contentType is text/html but no .html file extension
  if(contentType === 'text/html' && extname === '') filePath += '.html'

  //read file
  fs.readFile(filePath, (err, content) => {
      if(err){
          if(err.code === 'ENOENT'){ //error or no entity
            //Page not found
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                res.writeHead(404, {"Content-Type": "text/html"})
                res.end(content, "utf8")
            })
          }else{
              //server error
              res.writeHead(500)
              res.end(`Server error: ${err.code}`)
          }
      }else{
          //success
          res.writeHead(200, {"Content-Type": contentType})
          res.end(content, "utf8")
      }
  })
})

const PORT = process.env.PORT || 8000

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
