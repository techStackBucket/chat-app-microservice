const {usersDb} = require('../data-access');
const makeAddUser = require('./add-user');
const makeUpdateUser = require('./update-user');
const makeRemoveUser = require('./remove-user');
const makeGetUser = require('./get-user');
const makeListUser = require('./list-user');
const {isEmpty} = require('../helper')

const insert = makeAddUser({usersDb, isEmpty});
const update = makeUpdateUser({usersDb});
const remove = makeRemoveUser({usersDb});
const get = makeGetUser({usersDb});
const list = makeListUser({usersDb});

const userService = Object.freeze({
    insert,
    update,
    remove, 
    get,
    list
});

module.exports = {
    insert,
    update,
    remove, 
    get,
    list,
    default: userService
}
