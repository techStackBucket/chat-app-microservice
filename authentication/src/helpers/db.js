const mongoose = require('mongoose');
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

mongoose.set('useCreateIndex', true);
mongoose.connect(
    process.env.MONGODB_URI, 
    options
);

module.exports = {
    User: require('../models/User')
};