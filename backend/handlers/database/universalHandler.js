const couchDB = require('backend/handlers/database/couchDBHandler')

function checkIfTableExistsAndCreateIfRequired (tableName) {
  if (process.env.DATABASE_TYPE === 'COUCHDB') {
    return couchDB.checkIfDBExistsAndCreateIfRequired(tableName)
  } else {
    return new Error('Unsupported Database Type')
  }
}

function createRowInTable (rowContentsInJson, rowId, tableName) {
  if (process.env.DATABASE_TYPE === 'COUCHDB') {
    return couchDB.createObjectInDB(rowContentsInJson, rowId, tableName)
  } else {
    return new Error('Unsupported Database Type')
  }
}

module.exports = {
  checkIfTableExistsAndCreateIfRequired,
  createRowInTable
}
