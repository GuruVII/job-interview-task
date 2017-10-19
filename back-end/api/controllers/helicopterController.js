var GetDateFromTimestamp = require('../mixins/GetDateFromTimestamp');
var sortArrayofArrays = require('../mixins/sortArrayofArrays');

const mongoose = require('mongoose'),
helicopter = mongoose.model('Helicopters');

exports.listAllHelicopters = function(req, res) {
  helicopter.find({}, function(err, helicopter) {
    if (err)
      res.send(err);
    res.json(helicopter);
  });
};

exports.createHelicopter = function(req, res) {
  const newHelicopter = new helicopter(req.body);
  newHelicopter.save(function(err, helicopter) {
    if (err)
      res.send(err);
    res.json(helicopter);
  });
};


exports.readHelicopter = function(req, res) {
  helicopter.findById(req.params.helicopterId, function(err, helicopter) {
    if (err)
      res.send(err);
    res.json(helicopter);
  });
};

exports.cancelHelicopter = function(req, res) {
  helicopter.findOneAndUpdate({_id: req.params.helicopterId}, req.body, {new: true}, function(err, helicopter) {
    if (err)
      res.send(err);
    res.json(helicopter);
  });
};

exports.rentHelicopter = function(req, res) {
  //the input is changed into an array
  let item = req.body.history;
  //this pushes the new value on top of the existing one
  helicopter.findOneAndUpdate({_id: req.params.helicopterId}, {$push: {history: item}}, {new: true}, function(err, helicopter) {
    if (err)
      res.send(err);
    res.json(helicopter);
  });
};

exports.retireHelicopter = function(req, res) {
  helicopter.findOneAndUpdate({_id: req.params.helicopterId}, req.body, {new: true}, function(err, helicopter) {
    if (err)
      res.send(err);
    res.json(helicopter);
  });
};

exports.deleteHelicopter = function(req, res) {
  helicopter.remove({
    _id: req.params.helicopterId
  }, function(err, helicopter) {
    if (err)
      res.send(err);
    res.json({ message: 'Helicopter successfully deleted' });
  });
};
//history array of each helicopter [earning, data of rent (unix in seconds), rent time, company name]
exports.getGraphData = function(req, res) {
  let graphData = {};
  let graphDataArray;
  let timeStamp;
  let date;
  helicopter.findById(req.params.helicopterId, function(err, helicopter) {
    helicopter.history.forEach(function(historyEntry) {
      timeStamp = historyEntry.start;

      date = GetDateFromTimestamp(timeStamp + '000');
      //creates an object of arrays
      if (historyEntry.duration != -1) {
        if (graphData[date] == undefined) {
          graphData[date] = []
        }
        graphData[date][0] = (timeStamp - (timeStamp % (60 * 60 * 24))) * 1000
        if (graphData[date][1] == undefined) {
          graphData[date][1] = parseInt(historyEntry.duration)
        } else {
          graphData[date][1]+= parseInt(historyEntry.duration)
        }
      }
    })
    //turns the object of arrays into an array of arrays
    graphDataArray = Object.keys(graphData).map(key => {
      return graphData[key];
    })

    //sorts the array of arrays, by array[0]
    graphDataArray.sort(sortArrayofArrays);
    let arrayLength = graphDataArray.length;
    let dayInMS = 86400000
    //adds values for every missing day
    for (let i = 0; i < arrayLength - 1; i++){
      if ((graphDataArray[i][0] + dayInMS) != graphDataArray[i+1][0]) {
        graphDataArray.splice(i+1, 0, [graphDataArray[i][0] + dayInMS, 0])
        arrayLength ++
      }
    }
    if (err)
      res.send(err);
    res.json(graphDataArray);
  });
};