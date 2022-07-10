const couchDB = require('./couchDBHandler')

function createRowInTable (rowContentsInJson, rowId, tableName) {
  if (process.env.DATABASE_TYPE === 'COUCHDB') {
    return couchDB.createObjectInDB(rowContentsInJson, rowId, tableName)
  } else {
    return new Error('Unsupported Database Type')
  }
}

function getRowFromTable (rowId, tableName) {
  if (process.env.DATABASE_TYPE === 'COUCHDB') {
    return couchDB.getObjectFromDB(rowId, tableName)
  } else {
    return new Error('Unsupported Database Type')
  }
}

function listObjectsInTable (tableName) {
  if (process.env.DATABASE_TYPE === 'COUCHDB') {
    return couchDB.listObjectsInDB(tableName)
  } else {
    return new Error('Unsupported Database Type')
  }
}

module.exports = {
  createRowInTable,
  getRowFromTable,
  listObjectsInTable
}
