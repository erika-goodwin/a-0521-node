// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

//Inits
const app = express(); //initializing the express

app.use(bodyParser.urlencoded({extended: false}));

//Middlewares
// app.use((req, res, next) => {
//   console.log("first middleware");
//   next(); //allow the request to continue to the next middleware
// });

app.use("/add-products", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST><input type="text" name="message" /><button type="submit">Send</button></form>'
  );
});

app.use("/product", (req, res, next) => {
  console.log("BODY - ", req.body);
  res.redirect("/");
});

app.use((req, res, next) => {
  console.log("second middleware");
  res.end("<h1>Hello from Node.js</h1>");
});

//Server
// const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
