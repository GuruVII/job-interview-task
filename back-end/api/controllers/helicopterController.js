const mongoose = require('mongoose'),
helicopter = mongoose.model('Helicopters');

exports.totalRevenue = function(req, res) {
  let totalRevenue = 0;
  helicopter.find({}, function(err, helicopter) {
    helicopter.forEach(function(item) {
      item.history.forEach(function(value){
        totalRevenue += parseInt(value[0])
      })
    })
    if (err)
      res.send(err);
    res.json(totalRevenue);
  });
};

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


exports.updateHelicopterHistory = function(req, res) {
  //the input is changed into an array, and the string is transformed into integers
  let item = req.body.history.split("//")
  //this pushes the new value on top of the existing one
  helicopter.findOneAndUpdate({_id: req.params.helicopterId}, {$push: {history: item}}, {new: true}, function(err, helicopter) {
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