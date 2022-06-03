const express = require('express')
const path = require('path')
const app = express()

const authV1Router = require('./routes/V1/auth')
const recipeV1Router = require('./routes/V1/recipe')

const port = 8080

app.use(express.json())

app.use('/api/v1/auth', authV1Router)
app.use('/api/v1/recipe', recipeV1Router)

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
  res.end()
})

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Backend server listening on port', 8080)
})
