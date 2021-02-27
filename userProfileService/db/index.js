const {makeDb} = require('../src/data-access');
const dotenv = require('dotenv');
dotenv.config({path: require('find-config')('.env')});

(async function setupDb () {
  console.log('Setting up database...')
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  const db = await makeDb()
  const result = await db
    .collection('users')
    .createIndexes([
      { key: { id: 1 }, name: 'hash_idx' },
      { key: { email: -1 }, name: 'postId_idx' },
    ])
  console.log(result)
  console.log('Database setup complete...')
  process.exit()
})()
