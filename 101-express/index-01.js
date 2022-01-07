// const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

//inits
const app = express() //initializing the express

app.use(bodyParser.urlencoded({ extended: false }))

//middlewares
// app.use((req,res,next) => {
//     console.log("First Middleware")
//     next() //allow the request to continue to the next middleware
// })

app.use('/add-products', (req,res,next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Send</button></form>')
})

app.post('/product', (req,res,next) => {
    console.log('BODY - ', req.body)
    res.redirect('/')
})


app.use('/',(req,res,next) => {
    console.log("Second Middleware")
    res.send('<h1>Hello from NodeJS</h1>')
})

//server
// const server = http.createServer(app)
const PORT = process.env.PORT || 5000
// server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))