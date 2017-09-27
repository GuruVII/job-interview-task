
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*let getRevenue function(){
  let result = 0;
  let tempResult = [];
  this.history.forEach((currentValue) => {
    //split string with all the data and add the first entry (the revenue value) as a result
    tempResult = currentValue.split("//");
    result += tempResult[0]
    console.log(result);
    return result
  })
}*/

var HelicoperSchema = new Schema({
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
  /*totalRevenue: {
    type
  }  */  
});

module.exports = mongoose.model('Helicopters', HelicoperSchema);