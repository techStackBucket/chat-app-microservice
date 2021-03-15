const bcrypt = require('bcryptjs');

function getHashedPassword(password) {
    return bcrypt.hashSync(password, 10);
}

module.exports = getHashedPassword;