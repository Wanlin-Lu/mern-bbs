let users
let sessions

const injectDB = async (cdc) => {
  if (users && sessions) {
    return
  }
  try {
    users = await cdc.db('mern-bbs').collection('users')
    sessions = await cdc.db('mern-bbs').collection('sessions')
  } catch (e) {
    console.error(`Unable to establish collection handles in authDAO: ${e}`)
  }
}

const getUser = async (email) => {
  return await users.findOne({ email })
}

const addUser = async (userInfo) => {
  try {
    await users.insertOne({ ...userInfo }, { w: "majority" })
    return { success: true }
  } catch (e) {
    console.error(`Error occurred while adding new user, ${e}.`)
    return { error: e }
  }
}

const loginUser = async (email, jwt) => {
  try {
    await sessions.updateOne(
      { user_id: email },
      { $set: { jwt } },
      { upsert: true },
    )
    return { success: true }
  } catch (e) {
    console.error(`Error occurred whiile logging in user, ${e}`)
    return { error: e }
  }
}

const logoutUser = async (email) => {
  try {
    await sessions.deleteOne({ user_id: email })
    return { success: true }
  } catch (e) {
    console.error(`Error occurred while logging out user, ${e}`)
    return { error: e }
  }
}

const getUserSession = async (email) => {
  try {
    return sessions.findOne({ user_id: email })
  } catch (e) {
    console.error(`Error occurred while retrieving user session, ${e}`)
    return null
  }
}

exports.injectDB = injectDB
exports.getUser = getUser
exports.addUser = addUser
exports.loginUser = loginUser
exports.logoutUser = logoutUser
exports.getUserSession = getUserSession