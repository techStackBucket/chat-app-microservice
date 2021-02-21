const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    modifiedDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', schema);