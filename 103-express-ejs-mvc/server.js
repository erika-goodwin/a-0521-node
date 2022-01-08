const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

//Import
const memberRoute = require("./routes/routes");
const members = require("./models/Members");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views"); //explicitly setting the views directory

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //if you are receiving the json data

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "EJS",
    members: members,
  });
});

app.use("/api/members", memberRoute);
app.use((req, res) => {
  res.status(404).send("<h1></h1>");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
