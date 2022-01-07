const path = require('path')
const express = require('express')

const rootDirectory = require('../util/path')

const router = express.Router()

router.get('/', (req,res,next) => {
    // res.send('<h1>Shop Page</h1>')
    res.sendFile(path.join(rootDirectory, 'views', 'shop.html'))
})

module.exports = router