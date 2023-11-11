//require express
const express = require('express');

//start express on port 3000
const app = express();
const port = 3000;

//require mongoose
const mongoose = require('mongoose');

//require dotenv
require('dotenv').config();

//connect to mongodb
mongoose.connect(process.env.MONGODB);

// // check if connection works
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//import routes
const shoesRouter = require('./routes/api/v1/shoes');

//use imported routes & express
app.use(express.json());
app.use('/api/v1/shoes', shoesRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});