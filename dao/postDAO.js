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
    return await posts.aggregate([
      {
        $addFields: {
          "votesc.total": {
            $size: "$votes",
          },
          "votesc.up": {
            $size: {
              $filter: {
                input: "$votes",
                as: "vote",
                cond: {
                  $eq: ["$$vote.vote", 1],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          votes: 0,
        },
      },
    ]).toArray()
  } catch (e) {
    console.error(`Unable to issue find command, ${e}`)
    return { postList: [] }
  }
}



const getPostById = async (pid,{email}={}) => {
  try {
    return await posts.aggregate([
      {
        $match: {
          _id: ObjectId(pid)
        },
      },
      {
        $addFields: {
          "votesc.total": {
            $size: "$votes",
          },
          "votesc.up": {
            $size: {
              $filter: {
                input: "$votes",
                as: "vote",
                cond: {
                  $eq: ["$$vote.vote", 1],
                },
              },
            },
          },
          "votesc.user": {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$votes",
                  as: "vote",
                  cond: {
                    $eq: ["$$vote.email", email],
                  },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          "votesc.user": "$votesc.user.vote",
        },
      },
      {
        $project: {
          votes: 0,
        },
      },
    ]).toArray()
  } catch (e) {
    console.error(`Unable to issue find command, ${e}`);
    return { post: [] };
  }
}

const createPost = async (postData) => {
  try {
    let result
    result = await posts.insertOne({ ...postData }, { w: "majority" })
    return { success: true, id: result.insertedId };
  } catch (e) {
    console.error(`Error occurred while adding new post, ${e}`)
    return { error: e }
  }
}

const updatePost = async (pid, postData) => {
  try {
    let result
    result = await posts.updateOne(
      { _id: ObjectId(pid) },
      {
        $set: {
          title: postData.title,
          content: postData.content,
        }
      },
      { upsert: true },
    )
    return { success: true, id: result.upsertedId }
  } catch (e) {
    console.error(`Error occurred while update a post, ${e}`);
    return { error: e };
  }
}

const votePost = async (pid, vote) => {
  try {
    let result
    if (vote.value === 0) {
      result = await posts.updateOne(
        { _id: ObjectId(pid) },
        {
          $pull: { votes: { email: vote.eamil } },
        }
      );
    } else {
      result = await posts.updateOne(
        { _id: ObjectId(pid) },
        {
          $pull: { votes: { email: vote.eamil } },
          $push: { votes: vote }
        }
      );
    }
    return { success: true, id: result.upsertedId }
  } catch (e) {
    console.error(`Error occurred while update a post, ${e}`);
    return { error: e }
  }
}

const ObjectId = id => new ObjectID(id)

exports.injectDB = injectDB
exports.getPostById = getPostById
exports.getPosts = getPosts
exports.createPost = createPost
exports.updatePost = updatePost
exports.votePost = votePost

