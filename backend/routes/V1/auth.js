const express = require('express')
const passport = require('passport')
const Local = require('passport-local')
const crypto = require('crypto')

const db = require('./../../handlers/database/universalHandler')

const authV1 = express.Router()

passport.use(new Local(function verify (username, password, cb) {
  db.getRowFromTable(username, 'auth-local').then((row) => {
    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
      if (err) { return cb(err) }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' })
      }
      return cb(null, row)
    })
  }).catch((err) => {
    return cb(err)
    //     if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  })
}))

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})

authV1.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

authV1.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect('/')
  })
})

module.exports = authV1
