const http = require("http");
const users = [];
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html lang="en">
        <head>
            <title>Register</title>
        </head>
        <body>
            <form action="/create-user" method="POST">
                <input type="text" name="user"/>
                <button type="submit">Send</button>
            </form>
        </body>
        </html>`);
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    let bodyHtml = "";
    if (users.length > 0) {
      users.forEach((user) => (bodyHtml += `<li>${user}</li>`));
    }
    bodyHtml = `<a href="/">Home<a> <ul>${bodyHtml}</ul>`;
    res.write(bodyHtml);
    return res.end();
  }

  if (url === "/create-user" && method == "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      console.log("fff ---- ", chunk);
      chunks.push(chunk);
    });

    req.on("end", () => {
      users.push(
        Buffer.concat(chunks).toString().split("=")[1].replace("+", " ")
      );
      console.log(users);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/users");
    return res.end();
  }
});

server.listen(3000);
