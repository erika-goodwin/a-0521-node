const Product = require('../models/product.model')

exports.getProducts = (req,res,next) => {
    Product.fetchAll().then(([rowData, fieldData]) => {
        // console.log(rowData) // [ [rows], [configs...] ]

        res.render('shop/product-list', {
            pageTitle: 'All Products',
            products: rowData
        })


    }).catch(err => console.log(err))
}

exports.getAddProduct = (req,res,next) => {
    res.render('shop/add-edit-product', {
        pageTitle: 'Add Product',
        editing: false
    })
}

exports.postAddProduct = (req,res,next) => {
    const { title, imageUrl, description, price } = req.body

    const product = new Product(null, title, imageUrl, description, price)
    product.save()
    res.redirect('/')
}

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit
    if(!editMode) res.redirect('/')

    const prodId = req.params.productId
    Product.findById(prodId)
    .then(([rowData, fieldData]) => {
        res.render('shop/add-edit-product', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: rowData[0]
        })
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req,res,next) => {
    const {productId, title, imageUrl, description, price} = req.body
    const updatedProduct = new Product(productId, title, imageUrl, description, price)
    updatedProduct.edit()
    res.redirect('/')
}