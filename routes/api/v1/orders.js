//require express
const express = require('express');

//create a new router
const router = express.Router();

//require the order controller
const ordersController = require("../../../controllers/api/v1/orders");

router.post("/", ordersController.create);

//export the router
module.exports = router;