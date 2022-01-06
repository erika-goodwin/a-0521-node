const route = require("express").Router;

route.use("/write-message", (req, res, next) => {
  res.send("<h1>This is write message page</h1>");
});
route.use("/write-message", (req, res, next) => {
  res.send("<h1>This is write message page</h1>");
});

module.exports = route;
