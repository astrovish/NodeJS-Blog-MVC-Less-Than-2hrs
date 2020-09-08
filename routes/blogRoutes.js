const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

router.get("/create", blogController.createBlog);
router.post("/", blogController.insertBlog);
router.get("/edit/:id", blogController.editBlog);
router.put("/:id", blogController.updateBlog);
router.get("/", blogController.allBlogs);
router.get("/:slug", blogController.blogDetail);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;