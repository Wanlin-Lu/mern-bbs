require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.json({message: "app is running."})
})

app.listen(5000, () => {
  console.log(`Listening on port 5000.`)
})