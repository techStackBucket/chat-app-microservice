const makePostUser = require('./post-user');
const makePatchUser = require('./patch-user');

const {addUser, updateUser} = require('../use-cases')
const postUser = makePostUser({addUser});
const patchUser = makePatchUser({updateUser});

const userController = Object.freeze({postUser, patchUser});

module.exports = {
    postUser,
    patchUser,
    default: userController
}