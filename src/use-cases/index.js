const {usersDb} = require('../data-access');
const makeAddUser = require('./add-user');
const makeUpdateUser = require('./update-user');

const addUser = makeAddUser({usersDb});
const updateUser = makeUpdateUser({usersDb});

const userService = Object.freeze({
    addUser,
    updateUser
});

module.exports = {
    addUser,
    updateUser,
    default: userService
}
