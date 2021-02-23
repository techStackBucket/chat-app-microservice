const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../helpers/db');
const { UserAlreadyExist, WrongLoginInfoException } = require('../exceptions')

const User = db.User;

async function createUser(params) {
    if (await User.findOne({ email: params.email }))
        throw new UserAlreadyExist()

    const user = new User(params)

    if (params.password)
        user.password = bcrypt.hashSync(params.password, 10)

    await user.save();
}

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) 
        throw new WrongLoginInfoException()

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
    return {
        ...user.toJSON(),
        token
    };
}

module.exports = {
    createUser,
    authenticate
}