const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }
  try {
    const userJwt = req.get("Authorization").slice("Bearer ".length)

    const decodedToken = jwt.verify(
      userJwt,
      process.env.SECRET_KEY
    );

    req.userData = { email: decodedToken.email }
    next()
  } catch (err) {
    res.status(401).json({ error:"Authorization failed.!" })
    return next(err)
  }
}