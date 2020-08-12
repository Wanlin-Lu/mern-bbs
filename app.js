require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

const authRouter = require('./routers/auth-router')
const postRouter = require('./routers/post-router')
const commentRouter = require('./routers/comment-router')

const authDAO = require('./dao/authDAO')
const commentDAO = require('./dao/commentDAO')
const postDAO = require('./dao/postDAO')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next()
})

app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

MongoClient.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 50,
    wtimeout: 2500,
  }
).catch(err => {
  console.log(err.stack)
  process.exit(1)
}).then(async client => {
  await authDAO.injectDB(client)
  await commentDAO.injectDB(client)
  await postDAO.injectDB(client)
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
})