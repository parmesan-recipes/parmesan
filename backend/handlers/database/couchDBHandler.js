const dbUrl = `${process.env.COUCHDB_PROTOCOL}://${process.env.COUCHDB_USERNAME}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_URL}:${process.env.COUCHDB_PORT}`
const couchDb = require('nano')(dbUrl)

function checkIfDBExistsAndCreateIfRequired (dbName) {
  return couchDb.db.get(dbName).then(() => {
    return couchDb.use(dbName)
  }).catch(() => {
    return couchDb.db.create(dbName).then(() => {
      return couchDb.use(dbName)
    })
  })
}

function createObjectInDB (rowContentsInJson, rowId, tableName) {
}

module.exports = {
  checkIfDBExistsAndCreateIfRequired,
  createObjectInDB
}
