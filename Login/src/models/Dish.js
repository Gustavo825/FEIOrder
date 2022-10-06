const mongoose = require('mongoose');
const {Schema} = mongoose;
const Dish = new Schema ({
    title: String,
    cost: Float32Array,
    description: String,
    timeToCook: String,
    state: Boolean
})

Dish.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.pass;
    return obj;
   }

module.exports = mongoose.model('Dish',Dish)