import nano from 'nano'

const dbUrl = `${process.env.COUCHDB_PROTOCOL}://${process.env.COUCHDB_USERNAME}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_URL}:${process.env.COUCHDB_PORT}`
const couchDb = nano(dbUrl)

export async function checkIfDBExistsAndCreateIfRequired (dbName) {
  return couchDb.db.get(dbName).then(() => {
    return couchDb.use(dbName)
  }).catch(() => {
    return couchDb.db.create(dbName).then(() => {
      return couchDb.use(dbName)
    })
  })
}

export function createObjectInDB (rowContentsInJson, rowId, tableName) {
  return checkIfDBExistsAndCreateIfRequired(tableName).then((db) => {
    return db.insert(rowContentsInJson, rowId)
  })
}

export function getObjectFromDB (rowId, tableName) {
  return checkIfDBExistsAndCreateIfRequired(tableName).then((db) => {
    return db.get(rowId)
  })
}

export function listObjectsInDB (tableName) {
  return checkIfDBExistsAndCreateIfRequired(tableName).then((db) => {
    return db.list()
  })
}
