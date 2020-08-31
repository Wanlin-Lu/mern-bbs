const jwt = require("jsonwebtoken");
const commentDAO = require('../dao/commentDAO')

const getCommentList = async (req, res, next) => {
  const pid = req.params.id;
  const comments = await commentDAO.getComments(pid);

  res.json(comments);
}

const createComment = async (req, res, next) => {
  try {
    const commentFromBody  = req.body;
    const createCommentResult = await commentDAO.createComment(commentFromBody)

    const commentFromDB = await commentDAO.getCommentById(createCommentResult.id)

    res.json(commentFromDB)
  } catch (e) {
    res.status(500).json({ e });
  }
}

exports.getCommentList = getCommentList
exports.createComment = createComment