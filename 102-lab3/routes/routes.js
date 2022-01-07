const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const data = [];

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views", "home.html"));
});

router.get("/leave", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views", "leaveNote.html"));
});

router.post("/submit", (req, res, next) => {
  console.log(req.body); //{name: 'XXX', body: 'be fat'}

  //object
  let noteSubmitted = {
    name: req.body.name,
    content: req.body.body,
    published: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  data.push(noteSubmitted);
  fs.writeFile("noteSubmitted.txt", JSON.stringify(data), () => {
    res.status(302).redirect("/");
  });
});

router.get("/read", (req, res, next) => {
  fs.readFile("noteSubmitted.txt", "utf8", (err, data) => {
    let noteList = [];

    if (!err) {
      try {
        noteList = JSON.parse(data);
        //JASON.parse: to convert text into a JavaScript object
      } catch (e) {
        fs.writeFileSync("noteSubmitted.txt", []);
        noteList = [];
      }
    }
    data = noteList;

    res.render("readNote", { title: "Note List", noteList });
  });
});

module.exports = router;
