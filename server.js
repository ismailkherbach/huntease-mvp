const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const wakeDyno = require("woke-dyno");
const DYNO_URL = process.env.DYNO_URL;
app.use(express.static(path.join(__dirname, 'build')));
app.all('/*', (req, res) => res.sendFile(path.join(__dirname, '/build/index.html')));

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(Running on localhost:${port})
    wakeDyno(DYNO_URL).start();
});