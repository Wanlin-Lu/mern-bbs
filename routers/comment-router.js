const express = require("express");

const commentControllers = require("../controllers/comment.controller");

const router = express.Router();

router.get("/:id", commentControllers.getCommentList);

router.post("/", commentControllers.createComment);

module.exports = router;
