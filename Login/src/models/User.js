const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = new Schema ({
    name: String,
    username: String,
    pass: String,
    email: String
})

User.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.pass;
    return obj;
   }

module.exports = mongoose.model('User',User)