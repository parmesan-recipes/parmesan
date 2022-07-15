import express from 'express'

import { getObjectFromDB } from '../../handlers/database/couchDBHandler.js'
import bcrypt from 'bcrypt'
import { auth } from '../../middleware/auth.js'

export const router = express.Router()

function userPublic (user) {
  return { username: user._id }
}

router.get('/', [auth, (req, res) => {
  getObjectFromDB(req.username, 'users').then((user) => {
    res.send(userPublic(user))
  }).catch(() => {
    res.status(401).send({})
  })
}])

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  getObjectFromDB(username, 'users').then(async (user) => {
    const correctPassword = await bcrypt.compare(password, user.password)
    if (correctPassword) {
      req.session.username = username

      res.status(200).send(userPublic(user))
    } else {
      res.status(401).send({})
    }
  }).catch(async () => {
    res.status(401).send({})
  })
})

router.post('/logout', [auth, (req, res) => {
  req.session.username = undefined
  res.status(200).send({})
}])

router.post('/register', (req, res) => {
  res.send('UNIMPLEMENTED')
})
