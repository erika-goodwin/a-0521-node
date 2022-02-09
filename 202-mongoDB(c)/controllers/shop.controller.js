const Product = require('../models/product.model')
const Cart = require('../models/cart.model')

exports.getProducts = (req,res,next) => {
    //MySQL
    // Product.fetchAll().then(([rowData, fieldData]) => {
    //     // console.log(rowData) // [ [rows], [configs...] ]

    //     res.render('shop/product-list', {
    //         pageTitle: 'All Products',
    //         products: rowData
    //     })
    // }).catch(err => console.log(err))

    //MongoDB
    Product.fetchAll().then((products) => {
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

exports.postCart = (req,res,next) => {
    const {productId, price} = req.body
    Cart.addProduct(productId, price)
    res.redirect('/cart')
}

exports.getCart = (req,res,next) => {
    Cart.getCart((cart) => {
        Product.fetchAll().then((products) => {
            

            const cartProducts = []

            for(product of products){
                const cartProductData = cart.products.find(cartProd => cartProd.id === product._id.toString())

                if(cartProductData){
                    cartProducts.push({
                        productData: cartProductData,
                        quantity: cartProductData.quantity
                    })
                }
            }
            console.log('cart: ', cartProducts);

            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        }).catch(err => console.log(err))
    })
}

exports.postCartDeleteProduct = (req,res,next) => {
    const {productId} = req.body

    Product.findById(productId).then((product) => {
        Cart.deleteProduct(productId, product.price)
        res.redirect('/cart')
    }).catch(err => console.log(err))
}