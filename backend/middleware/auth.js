export function authOptional (req, res, next) {
  if (req.session.username) {
    req.username = req.session.username
  }
  next()
}

export function auth (req, res, next) {
  if (req.session.username) {
    req.username = req.session.username
    next()
  } else {
    res.status(401).send({})
  }
}
