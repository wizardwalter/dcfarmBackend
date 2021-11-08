var express = require("express");
var router = express.Router();
const dogsController = require("../Controllers/dogController");
const fs = require('fs');
const upload = require("multer");
const cloud = require("../config/cloudinary_config");
const checkAuth = require("../middleware/check-auth");

router.post('/create', checkAuth, cloud.single("photo"), dogsController.createDogs);

router.get('', dogsController.getDogs);

router.get('/:id', dogsController.getDog);

router.delete('/:id', checkAuth, dogsController.deleteDog);

router.put('/:id', checkAuth, cloud.single("photo"), dogsController.editDog);

module.exports = router;

