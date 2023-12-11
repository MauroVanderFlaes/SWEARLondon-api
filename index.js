//require express
const express = require("express");

//start express on port 3000
const app = express();
const port = 3000;
const http = require("http");

const server = http.createServer(app);
require("./primus/live.js").go(server);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

//require cors
const cors = require("cors");

//require mongoose
const mongoose = require("mongoose");

//require dotenv
require("dotenv").config();

//connect to mongodb
mongoose.connect(process.env.MONGODB);

// // check if connection works
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//import routes
const shoesRouter = require("./routes/api/v1/shoes");
const usersRouter = require("./routes/api/v1/users");

//use imported routes & express
app.use(express.json());
//use cors
app.use(cors());
app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}