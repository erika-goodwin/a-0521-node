const express = require("express");

const router = express.Router;

router.length("/", (req, res, next) => {
  res.send("<h1>Shop Page</h1>");
});

module.exports = router;
