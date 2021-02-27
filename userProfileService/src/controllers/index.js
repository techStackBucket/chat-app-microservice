const makePostUser = require('./post-user');
const makePatchUser = require('./patch-user');
const makeDeleteUser = require('./delete-user');
const makeGetUser = require('./get-user');
const makeListUser = require('./list-user');

const {insert, update, remove, get, list} = require('../use-cases');

const postUser = makePostUser({insert});
const patchUser = makePatchUser({update});
const deleteUser = makeDeleteUser({remove});
const getUser = makeGetUser({get});
const listUser = makeListUser({list});

const userController = Object.freeze({postUser, patchUser, deleteUser, getUser, listUser});

module.exports = {
    postUser,
    patchUser,
    deleteUser,
    getUser,
    listUser,
    default: userController
}