const express = require("express");

const commentControllers = require("../controllers/comment.controller");
const checkAuth = require('../middleware/check-auth')

const router = express.Router();

router.get("/:id", commentControllers.getCommentList);

router.use(checkAuth)

router.post("/", commentControllers.createComment);

module.exports = router;
