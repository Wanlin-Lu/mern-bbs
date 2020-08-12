const { ObjectID } = require("mongodb")

let posts

const injectDB = async (cc) => {
  if (posts) {
    return
  }
  try {
    posts = await cc.db("mern-bbs").collection("posts")
  } catch (e) {
    console.error(`Unable to establish a collection handle in PostDAO: ${e}`)
  }
}

const getPosts = async () => {
  try {
    return await posts.find()
  } catch (e) {
    console.error(`Unable to issue find command, ${e}`)
    return { postList: [] }
  }
}



const getPostById = async pid => {
  try {
    return await posts.findOne(ObjectId(pid));
  } catch (e) {
    console.error(`Unable to issue find command, ${e}`);
    return { post: [] };
  }
}

const createPost = async (postData) => {
  try {
    await posts.insertOne({ ...postData }, { w: "majority" })
    return { success: true }
  } catch (e) {
    console.error(`Error occurred while adding new post, ${e}`)
    return { error: e }
  }
}

const updatePost = async (pid, postData) => {
  try {
    await posts.updateOne(
      ObjectId(pid),
      {
        $set: {
          title: postData.title,
          content: postData.content,
        }
      },
      { upsert: true },
    )
    return { success: true }
  } catch (e) {
    console.error(`Error occurred while update a post, ${e}`);
    return { error: e };
  }
}

const ObjectId = id => new ObjectID(id)

exports.injectDB = injectDB
exports.getPostById = getPostById
exports.getPosts = getPosts
exports.createPost = createPost
exports.updatePost = updatePost
