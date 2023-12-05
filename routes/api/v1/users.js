//require express
const express = require('express');

//create a new router
const router = express.Router();

//require the shoes controller
const usersController = require("../../../controllers/api/v1/users");

router.post("/", usersController.create);
router.patch("/:mail", usersController.updatePassword);

//export the router
module.exports = router;