const express = require("express");
const http = require("http");
const path = require("path");
const wakeDyno = require("woke-dyno");

const app = express();

app.listen(PORT, () => {
  wakeDyno("https://afternoon-thicket-26736.herokuapp.com").start(); // DYNO_URL should be the url of your Heroku app
});
app.use(express.static(path.join(__dirname, "build")));
app.all("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/build/index.html"))
);

const port = process.env.PORT || "8080";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
