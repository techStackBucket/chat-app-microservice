const db = require('_helpers/db.js');
const User = db.User;

module.exports = {
    getAll,
    getByEmail,
    getByUserId,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await User.find();
}

async function getByEmail(email) {
    return await User.findOne({ email: email});
    // return await User.findOne({userId:userId});
}

async function getByUserId(userId) {
    return await User.findOne({userId:userId});
}

async function create(userParam) {
    // validate
    var isUsed = await User.findOne({ userName: userParam.userName})
    if (isUsed) {
        throw 'Username "' + userParam.userName + '" is already taken';
    }

    isUsed = await User.findOne({ email: userParam.email})
    if (isUsed) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // save user
    await user.save();
}

async function update(userParam) {
    // const user = await User.findOne({email: userParam.email});
    const user = await User.findOne({userId:userParam.userId});

    // validate
    if (!user) throw 'User not found';
    if (user.userName !== userParam.userName && await User.findOne({ userName: userParam.userName })) {
        throw 'Username "' + userParam.userName + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(userId) {
    // await User.findOneAndDelete({email:email});
    await User.findOneAndDelete({userId:userId});
}