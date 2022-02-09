const Product = require('../models/product.model')
const Cart = require('../models/cart.model')

exports.getProducts = (req,res,next) => {
    // Product.fetchAll().then(([rowData, fieldData]) => {
    //     // console.log(rowData) // [ [rows], [configs...] ]

    //     res.render('shop/product-list', {
    //         pageTitle: 'All Products',
    //         products: rowData
    //     })


    // }).catch(err => console.log(err))
    Product.fetchAll().then((products) => {

        const tempProducts = products.map(p => ({ ...p, description: `${p.description.slice(0, 25)}...` }))

        res.render('shop/product-list', {
            pageTitle: 'All Products',
            products: tempProducts
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
    const {productId} = req.body

    Product.findById(productId).then(product => {
        Cart.addProduct(productId, product.price);
        res.redirect('/cart');

    }).catch(err => console.log(err))
}

exports.getCart = (req,res,next) => {
    Cart.getCart((cart) => {
        Product.fetchAll().then((products) => {
            const cartProducts = []

            for(p of products){
                const cartProductData = cart.products.find(cartProd => cartProd.id === p._id.toString())

                
                if(cartProductData){
                    cartProducts.push({
                        productData: p,
                        quantity: cartProductData.quantity
                    })
                }
            }

            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                products: cartProducts,
                totalPrice: cart.totalPrice
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