let comments

const injectDB = async (cc) => {
  if (comments) {
    return
  }
  try {
    comments = await cc.db('mern-bbs').collection('comments')
  } catch (e) {
    console.error(`Unable to establish a collection handle in PostDAO: ${e}`);
  }
}

const getComments = async pid => {
  try {
    return await comments.find({ author: ObjectId(pid) }).toArray();
  } catch (e) {
    console.error(`Unable to issue find command, ${e}`);
    return { commentList: [] };
  }
};

const getCommentById = async cid => {
  try {
    return await comments.findOne(ObjectId(cid));
  } catch (e) {
    console.error(`Unable to issue find command, ${e}`);
    return { comment: [] };
  }
}

const createComment = async (commentData) => {
  try {
    let result;
    result = await comments.insertOne({ ...commentData }, { w: "majority" });
    return { success: true, id: result.insertedId };
  } catch (e) {
    console.error(`Error occurred while adding new post, ${e}`);
    return { error: e };
  }
};

const ObjectId = (id) => new ObjectID(id);

exports.injectDB = injectDB
exports.getComments = getComments
exports.createComment = createComment