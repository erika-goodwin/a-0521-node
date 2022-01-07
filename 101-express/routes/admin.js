const path = require('path')
const router = require('express').Router()

const rootDirectory = require('../util/path')

router.get('/add-products', (req,res,next) => {
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title" /><button type="submit">Send</button></form>')
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
    res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'))
})

router.post('/product', (req,res,next) => {
    console.log('BODY - ', req.body)
    res.redirect('/')
})

module.exports = router