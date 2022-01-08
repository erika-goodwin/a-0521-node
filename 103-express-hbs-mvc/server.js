const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars").engine;
const path = require("path");

const memberRoute = require("./routes/routes");
const members = require("./models/Members");

const app = express();
app.engine("handlebars", hbs());
app.set("view engine", "handlebars");
app.set("views", "views"); //explicitly setting the views directory

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "HBS",
    members,
  });
});

app.use("/api/members", memberRoute);

app.use((req, res) => {
  res.status(404).send("<h1>Error 404: Page not found</h1>");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
