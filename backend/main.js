import express from 'express'
import path from 'path'
import session from 'express-session'
import { v4 as uuidv4 } from 'uuid'
import sqlite from 'connect-sqlite3'

import { router as userV1Router } from './routes/V1/user.js'
import { recipeV1Router } from './routes/V1/recipe.js'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()

const SQLiteStore = sqlite(session)

const port = 8080

app.use(express.json())

app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './' })
}))

app.use('/api/v1/user', userV1Router)
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
