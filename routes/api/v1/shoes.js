//require express
const express = require('express');
const authenticateAdmin = require('../../../middleware/auth');

//create a new router
const router = express.Router();

//require the shoes controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.post("/", shoesController.create);
router.get("/", authenticateAdmin, shoesController.index);
router.get("/:id", authenticateAdmin, shoesController.indexId);
router.put("/:id", authenticateAdmin, shoesController.update);
router.delete("/:id", authenticateAdmin, shoesController.destroy);


//export the router
module.exports = router;