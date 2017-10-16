
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HelicopterSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of helicopter'
  },
  lift: {
    type: Number,
    required: 'What is the helicopters lift?'
  },
  maxPassangers: {
      type: Number,
      required: 'Kindly enter the number of passangers in the helicopter'
  },
  maxSpeed: {
    type: Number,
    required: 'Kindly enter the top speed of the helicopter'
  },
  picture: {
    type: String,
    required: 'Kindly enter the picture name'
  },
  retired: {
    type: Boolean,
  },
  history: [],
});

module.exports = mongoose.model('Helicopters', HelicopterSchema);