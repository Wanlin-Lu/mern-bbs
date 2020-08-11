require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.json({message: "app is running."})
})

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

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
})