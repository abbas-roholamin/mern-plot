/** @format */

var express = require("express");
var multer = require("multer");
var app = express();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/photo", upload, function (req, res) {
  res.end("File is uploaded");
});

app.listen(3000, function () {
  console.log("Working on port 3000");
});
