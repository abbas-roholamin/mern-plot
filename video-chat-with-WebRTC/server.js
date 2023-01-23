/** @format */

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

app.set("view engine", "ejs");
app.set(express.static("public"));

app.get("/", (reg, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (reg, res) => {
  res.render("room", { room: reg.params.room });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`);
});
