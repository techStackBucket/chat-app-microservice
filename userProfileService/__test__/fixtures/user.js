const faker = require('faker');
const cuid = require('cuid');
const crypto = require('crypto');

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

module.exports = function makeFakeUser (overrides) {
  const user = {
    name:faker.name.firstName(),
    surname:faker.name.lastName(),
    email:faker.internet.email(),
    nickName:faker.internet.userName(),
    createdOn: Date.now(),
    id: Id.makeId(),    
    modifiedOn: Date.now(),
    password:md5(faker.lorem.paragraph(6)),
    age:30,
    gender:"female",
    isDeleted: false
  }

  return {
    ...user,
    ...overrides
  }
}
