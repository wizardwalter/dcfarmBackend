var express = require("express");
var router = express.Router();
const aboutController = require("../Controllers/aboutController");


router.post("/create", aboutController.createAbout);

router.get("", aboutController.getAbout);





module.exports = router;