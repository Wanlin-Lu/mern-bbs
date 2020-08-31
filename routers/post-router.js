const express = require("express");

const postControllers = require("../controllers/post.controller");
const checkAuth = require('../middleware/check-auth')

const router = express.Router();

router.get("/", postControllers.getPostList);

router.get("/:id", postControllers.getPostById);

router.use(checkAuth)

router.post("/", postControllers.createPost);

router.patch('/:id', postControllers.updatePost)

module.exports = router;
