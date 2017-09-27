
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
  history: [],
});

/*HelicopterSchema.methods.totalRevenue = function(){
  console.log("test")
  let result = 0;
  let tempResult = [];
  this.history.forEach(function(currentValue) {
    //split string with all the data and add the first entry (the revenue value) as a result
    tempResult = parseInt(currentValue[0], 10);
    result += tempResult
    console.log(result);
    return result
  })
  return result
}*/

module.exports = mongoose.model('Helicopters', HelicopterSchema);