const makeUsersDb = require('./users-db');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const MongoClient = mongodb.MongoClient
const url = process.env.USERS_DB_URL
const dbName = process.env.USERS_DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true })

const makeDb = async function() {
    if (!client.isConnected()) {
      console.log(url)
      await client.connect()
    }
    return client.db(dbName)
}

const usersDb = makeUsersDb({ makeDb })

module.exports = {
    usersDb,
    makeDb
}
  
  