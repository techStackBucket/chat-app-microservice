const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // TODO : which dataType is userID going to be? integer or string?
    userId : { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    userName: { type: String, unique: true, required: true },
    name:{type: String, required:true},
    surName: { type: String, required: true },
    age: { type: Number, required: false },
    gender: { type: Boolean, required: false },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        // delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);