const jwt = require("jsonwebtoken");
const commentDAO = require('../dao/commentDAO')



const getCommentList = async (req, res, next) => {
  const pid = req.params.id;
  const comments = await commentDAO.getComments(pid);

  res.json(comments);
}

const createComment = async (req, res, next) => {
  try {
    const userJwt = req.get("Authorization").slice("Bearer ".length);

    const decodedToken = jwt.verify(
      userJwt,
      process.env.SECRET_KEY,
      (error, res) => {
        if (error) {
          return { error };
        }
        return { ...res };
      }
    );

    var { error } = decodedToken;
    if (error) {
      res.status(401).json({ error });
      return;
    }

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