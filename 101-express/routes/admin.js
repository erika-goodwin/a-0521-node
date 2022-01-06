const route = require("express").Router;

route.use("/add-products", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST><input type="text" name="message" /><button type="submit">Send</button></form>'
  );
});

route.use("/product", (req, res, next) => {
  console.log("BODY - ", req.body);
  res.redirect("/");
});

module.exports = route;
