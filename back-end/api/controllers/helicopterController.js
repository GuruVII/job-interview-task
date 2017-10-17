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
  let item = req.body.history.split("//")
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
  let date;
  function GetDateFromTimestamp(stamp) {
    let fullDate = new Date(parseInt(stamp))
    return `${fullDate.getFullYear()}-${fullDate.getMonth()+1}-${fullDate.getDate()}`
  }
  helicopter.findById(req.params.helicopterId, function(err, helicopter) {
    helicopter.history.forEach(function(usageHistoryEntry) {
      date = GetDateFromTimestamp(usageHistoryEntry[1] + '000');
      if (usageHistoryEntry[2] != -1) {
        if (graphData[date] == undefined) {
          graphData[date] = {}
        }
        graphData[date]['date'] = date;
        if (graphData[date]['usage'] == undefined) {
          graphData[date]['usage'] = parseInt(usageHistoryEntry[2])
        } else {
          graphData[date]['usage']+= parseInt(usageHistoryEntry[2])
        }
      }
    })
    if (err)
      res.send(err);
    res.json(graphData);
  });
};