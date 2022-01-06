const fs = require("fs");
const request = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write(`
        <h1>Title</h1>
        <a href='write-message'>Send Message</a>
        <a href='read-message'>Read Message</a>
    `);
    return res.end();
  }

  if (req.url === "/write-message") {
    res.setHeader("Content-type", "text/html");
    res.write(`
        <h1>Write a message</h1>
        <form action ='/message' method='POST'>
            <input type='text' name='message' />
            <button type='submmit'>Send Message</button>
        </form>
    `);
    return res.end();
  }

  if (req.url === "/read-message") {
    try {
      const data = fs.readFileSync("message.txt", "uft8");

      res.setHeader("Content-Type", "text/html");
      res.write(`
         <h1>Read a message</h1>
         <p>${data}</p>
    `);

      return res.end();
    } catch (error) {
      console.log("error", error);
    }
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];

    req.on("data", (packets) => {
      body.push(packets);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      fs.writeFile("message.txt", message, (err) => {
        if (err) throw err;
        res.statusCode = 302;
        res.setHeader("Location", "/");

        return res.end();
      });
    });
  }
};

module.exports = request;
