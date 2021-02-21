const crypto = require("crypto");
const Id = require('../Id');
const buildMakeUser = require("./user");

const makeUser = buildMakeUser({Id, md5, validation})

function md5 (value) {
    return crypto
      .createHash('md5')
      .update(value, 'utf-8')
      .digest('hex')
}

function validation(value,type){
    return true;
}
  
module.exports = makeUser;