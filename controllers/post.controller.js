const jwt = require("jsonwebtoken");
const postDAO = require('../dao/postDAO')

const ObjectId = (id) => new ObjectID(id);

const getPostList = async (req, res, next) => {
  const postList = await postDAO.getPosts()

  res.json(postList)
}

const getPostById = async (req, res, next) => {
  const pid = req.params.id
  const {email} = req.body
  const post = await postDAO.getPostById(pid,{email})

  res.json(post)
}

const createPost = async (req, res, next) => {
  try {
    const postData = req.body
    const createResult = await postDAO.createPost(postData)

    if (!createResult.success) {
      var { error } = createResult
      res.status(401).json({ error })
    }

    const postFromDB = await postDAO.getPostById(createResult.id)

    res.json(postFromDB)
  } catch (e) {
    res.status(500).json({ e })
  }
}

const updatePost = async (req, res, next) => {
  try {
    const pid = req.params.id;
    const postData = req.body;
    const updateResult = await postDAO.updatePost(pid, postData);

    if (!updateResult.success) {
      var { error } = updateResult;
      res.status(401).json({ error });
    }

    // upsertedId = null, 只能用pid
    const postFromDB = await postDAO.getPostById(pid);

    res.json(postFromDB);
  } catch (e) {
    res.status(500).json({ e });
  }
}

const votePostById = async (req, res, next) => {
  try {
    const pid = req.params.id;
    const vote = req.body;
    const voteResult = await postDAO.votePost(pid, vote)
    
    if (!voteResult.success) {
      var { error } = voteResult
      res.status(401).json({ error });
    }

    const postFromDB = await postDAO.getPostById(pid);

    res.json(postFromDB)
  } catch (e) {
    res.status(500).json({ e });
  }
}


exports.getPostList = getPostList
exports.getPostById = getPostById
exports.createPost = createPost
exports.updatePost = updatePost
exports.votePostById = votePostById