const route = require("express").Router;

route.use("/", (req, res, next) => {
  res.send(
    "<h1>Hello Node!</h1><br/><a>http://localhost:8000/read-message</a><br/><a>http://localhost:8000/write-message</a>"
  );
});

module.exports = route;
