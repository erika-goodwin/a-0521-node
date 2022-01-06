const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

//Inits
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDirectory = require("./util/path");

const app = express(); //initializing the express

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(adminRoutes);
app.use(shopRoutes);

//Catch all middleware
app.use((req, res, next) => {
  //   res.status(404).send("<h1>Page not find</h1>");
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
//   res.status(404).sendFile(path.join(rootDirectory, "views", "404.html"));
});

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
