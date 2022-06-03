const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const port = 8080

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
  res.end()
})

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Backend server listening on port', 8080)
})
