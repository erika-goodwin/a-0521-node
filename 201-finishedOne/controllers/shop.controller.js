const Product = require('../models/product.model')

exports.getProducts = (req,res,next) => {
    // Product.fetchAll().then(([rowData, fieldData]) => {
    //     // console.log(rowData) // [ [rows], [configs...] ]

    //     res.render('shop/product-list', {
    //         pageTitle: 'All Products',
    //         products: rowData
    //     })


    // }).catch(err => console.log(err))
    Product.fetchAll().then((products) => {
        console.log('prod: ', products);
        res.render('shop/product-list', {
            pageTitle: 'All Products',
            products: products
        })


    }).catch(err => console.log(err))
}

exports.getProductById = (req,res,next) => {
    const prodId = req.params.productId
    Product.findById(prodId)
    .then((product) => {
        res.render('shop/product-detail', {
           pageTitle: product.title,
           product: product
        })
    })
    .catch((err) => console.log(err))

}