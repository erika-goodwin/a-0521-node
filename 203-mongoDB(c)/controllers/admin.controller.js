const Product = require('../models/product.model')

exports.getAllProducts = (req,res,next) => {
    Product.fetchAll().then((products) => {

        const tempProducts = products.map(p => ({ ...p, description: `${p.description.slice(0, 25)}...` }))

        res.render('admin/products', {
            pageTitle: 'All Products',
            products: tempProducts
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

    const product = new Product(title, imageUrl, description, price)
    product.save()
    res.redirect('/')
}

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit
    if(!editMode) res.redirect('/')

    const prodId = req.params.productId
    Product.findById(prodId)
    .then((product) => {
        res.render('shop/add-edit-product', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        })
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req,res,next) => {
    const {productId, title, imageUrl, description, price} = req.body

    const updatedProduct = new Product(title, imageUrl, description, price)
    updatedProduct.edit(productId)
    .then(() => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteById(prodId).then(() => {
        res.redirect('/')
    }).catch((err) => console.log(err))
}