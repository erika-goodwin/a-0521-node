const http = require("http");
const express = require("express");

const mainRoutes = require("./routes/main");
const messageRoutes = require("./routes/message");

const app = express();

app.use(mainRoutes);
app.use(messageRoutes);

const server = http.createServer((req, res) => {
  console.log(req);
});

const PORT = process.nextTick.PORT || 8000;

server.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
