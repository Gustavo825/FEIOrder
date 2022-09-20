const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = new Schema ({
    name: String,
    username: String,
    password: String,
    email: String
})
module.exports = mongoose.model('User',User)