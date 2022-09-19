const mongoose = require('mongoose');
const { Schema } = mongoose;

const Restaurant = new Schema ({
    name : String,
    address : String,
    schedule : String,
    description : String
});

module.exports = mongoose.model('Restaurant', Restaurant)