const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(`
          <html>
              <head>
                  <title>First Page</title>
              </head>
              <body>
                  <form action="/message" method="POST>
                      <input type="text" name="message" />
                      <button type="submit">Send</button>
                  </form>
              </body>
          </html>
      `);
    return res.end(); //We should exit out of the function
  }

  if (url === "/message" && method === "POST") {
    // console.log(req.body);
    //parsing req data
    const body = [];

    // 'on' is a listener to certain events
    req.on("data", (chunk) => {
      //   console.log(chunk);  // Buffer object(binary data): <Buffer 6d 65 73 73 61 67 65 3d 68 69>
      body.push(chunk);
    });

    //event listener that gets triggered once the incoming request is done
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      //   console.log(parsedBody);
      const message = parsedBody.split("=")[1];

      fs.wroteFileSync("lect-01.txt", message),
        (err) => {
          if (err) throw err;
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        };
    });
  }
};

module.exports = requestHandler;
