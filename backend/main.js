const express = require('express')
const path = require('path')
const app = express()
const passport = require('passport')
const session = require('express-session')

const { v4: uuidv4 } = require('uuid')

const SQLiteStore = require('connect-sqlite3')(session)

const authV1Router = require('./routes/V1/auth')
const recipeV1Router = require('./routes/V1/recipe')

const port = 8080

app.use(express.json())

app.use('/api/v1/auth', authV1Router)
app.use('/api/v1/recipe', recipeV1Router)

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './' })
}))

app.use(passport.authenticate('session'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
  res.end()
})

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Backend server listening on port', 8080)
})
