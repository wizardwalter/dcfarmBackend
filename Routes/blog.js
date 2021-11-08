var express = require("express");
var router = express.Router();
const blogController = require("../Controllers/blogController");
const fs = require('fs');
const upload = require("multer");
const cloud = require("../config/cloudinary_config")
const checkAuth = require("../middleware/check-auth");




router.post("/create", checkAuth, cloud.single("photo"), blogController.createBlog);

router.get("", blogController.getBlogs);

router.get("/:id", blogController.getBlog);

router.put("/:id",checkAuth, cloud.single("photo"), blogController.editBlog);

router.delete("/:id",checkAuth, blogController.deleteBlog);


module.exports = router;