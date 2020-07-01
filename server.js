const express = require("express");
const http = require("http");
const path = require("path");

const app = express();

process
  .on("SIGTERM", shutdown("SIGTERM"))
  .on("SIGINT", shutdown("SIGINT"))
  .on("uncaughtException", shutdown("uncaughtException"));

setInterval(console.log.bind(console, "tick"), 1000);
http
  .createServer((req, res) => res.end("hi"))
  .listen(process.env.PORT || 3000, () => console.log("Listening"));

function shutdown(signal) {
  return (err) => {
    console.log(`${signal}...`);
    if (err) console.error(err.stack || err);
    setTimeout(() => {
      console.log("...waited 5s, exiting.");
      process.exit(err ? 1 : 0);
    }, 5000).unref();
  };
}
app.use(express.static(path.join(__dirname, "build")));
app.all("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/build/index.html"))
);

const port = process.env.PORT || "8080";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
