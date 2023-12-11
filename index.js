const express = require("express");
const http = require("http");
const Primus = require("primus");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Import routes
const shoesRouter = require("./routes/api/v1/shoes");
const usersRouter = require("./routes/api/v1/users");

app.use(express.json());
app.use(cors());
app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/users", usersRouter);

// Create an HTTP server
const server = http.createServer(app);

// Create a Primus instance and attach it to the server
const primus = new Primus(server, { transformer: "websockets" });

// Add your Primus logic in primus/live.js (similar to what you had before)
require("./primus/live").go(primus);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});