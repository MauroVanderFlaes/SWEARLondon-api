//require express
const express = require('express');

//create a new router
const router = express.Router();

//require the shoes controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.post("/", shoesController.create);
router.put("/:id", shoesController.update);

//export the router
module.exports = router;