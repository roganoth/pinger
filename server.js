const express = require("express");
const path = require("path");
// var keys = require("./config/keys.js")

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./controller/picker-controller.js");

app.use(routes);

app.listen(PORT, function () {
  console.log("Server listening on : http://localhost:" + PORT);
});
