//require express
const express = require('express');

const authenticateAdmin = require('../../../middleware/auth');

//create a new router
const router = express.Router();

//require the shoes controller
const usersController = require("../../../controllers/api/v1/users");

router.post("/", usersController.create);
router.patch("/:id", authenticateAdmin, usersController.updatePassword);
router.post("/login", usersController.login);

//export the router
module.exports = router;