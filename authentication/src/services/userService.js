const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;

async function createUser(params) {
    if (await User.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    const user = new User(params);

    if (params.password) {
        user.password = bcrypt.hashSync(params.password, 10);
    }

    await user.save();
}

module.exports = {
    createUser
}