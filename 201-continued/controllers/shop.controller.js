const Product = require("../models/product.model");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rowData, fieldData]) => {
      // console.log(rowData) // [ [rows], [configs...] ]

      res.render("shop/product-list", {
        pageTitle: "All Products",
        products: rowData,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductById = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((rowData, fieldData) => {
      res.render("shop/product-detail", {
        pageTitle: rowData[0].title,
        product: rowData[0],
      });
    })
    .catch((err) => console.log(err));
};

