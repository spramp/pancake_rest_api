var mongoose = require('mongoose');

var PancakeSchema = new mongoose.Schema({
  ingredients: String,
  type: String,
  syrup: String,
  topping: String,
  instructions: String,
  time: String
});

module.exports = mongoose.model('Pancake', PancakeSchema);
