const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authDAO = require('../dao/authDAO')

const hashPassword = async password => await bcrypt.hash(password, 10)

const signup = async (req, res) => {
  try {
    const userFromBody = req.body
    
    let errors = {}
    if (userFromBody && userFromBody.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }
    if (userFromBody && userFromBody.username.length < 3) {
      errors.name = "Username must be at least 3 characters"
    }
    if (Object.keys(errors).length > 0) {
      res.status(400).json(errors)
      return
    }

    let existingUser;
    existingUser = await authDAO.getUser(userFromBody.email);
    if (existingUser && !existingUser.error) {
      res
        .status(422)
        .json({ error: "User already exists, please login instead." });
      return;
    }

    const userInfo = {
      ...userFromBody,
      password: await hashPassword(userFromBody.password),
    }

    const insertResult = await authDAO.addUser(userInfo)
    if (!insertResult.success) {
      errors.email = insertResult.error
    }

    const userFromDB = await authDAO.getUser(userFromBody.email)
    if (!userFromDB) {
      errors.general = "Internal error, please try again later."
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json(errors)
      return
    }

    let token
    token = jwt.sign(
      {
        username: userFromDB.username,
        email: userFromDB.email,
        password: userFromDB.password,
      },
      process.env.SECRET_KEY,
      { expiresIn: '1h'}
    )

    res.json({
      token,
      ...userFromDB,
      password: null
    })
  
  } catch (e) {
    res.status(500).json({ error: e })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || typeof email !== "string") {
      res.status(400).json({ error: "Bad email format, expected string." })
      return
    }
    if (!password || typeof password !== "string") {
      res.status(400).json({ error: "Bad password format, expected string." })
      return
    }

    let userData = await authDAO.getUser(email)
    if (!userData) {
      res.status(401).json({ error: "Make sure your email is correct." })
      return
    }

    if (!(await bcrypt.compare(password, userData.password))) {
      res.status(401).json({ error: "Make sure your password is correct." })
      return 
    }

    let token;
    token = jwt.sign(
      {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const loginResponse = await authDAO.loginUser(email, token)
    
    if (!loginResponse.success) {
      res.status(500).json({ error: loginResponse.error })
      return
    }

    res.json({ token, ...userData, password: null })
  } catch (e) {
    res.status(400).json({ error: e })
    return
  }
}

const logout = async (req, res) => {
  try {
    const userJwt = req.get("Authorization").slice("Bearer ".length)

    const decodedToken = jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
      if (error) {
        return { error }
      }
      return { ...res }
    }) 

    var { error } = decodedToken
    if (error) {
      res.status(401).json({ error })
      return
    }

    const logoutResult = await authDAO.logoutUser(decodedToken.email)

    var { error } = logoutResult
    if (error) {
      res.status(500).json({ error })
      return
    }

    res.json(logoutResult)
  } catch (e) {
    res.status(500).json(e)
  }
}

exports.signup = signup
exports.login = login
exports.logout = logout