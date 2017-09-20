var mongoose = require('mongoose'),
  helicopter = mongoose.model('Helicopters');

exports.listAllHelicopters = function(req, res) {
  helicopter.find({}, function(err, helicopter) {
    if (err)
      res.send(err);
    res.json(helicopter);
  });
};




exports.createHelicopter = function(req, res) {
  var newHelicopter = new helicopter(req.body);
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


exports.updateHelicopter = function(req, res) {
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