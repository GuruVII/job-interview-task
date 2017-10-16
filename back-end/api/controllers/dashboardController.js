const mongoose = require('mongoose'),
dashboard = mongoose.model('Helicopters');

exports.totalRevenue = function(req, res) {
  let totalRevenue = 0;
  dashboard.find({}, function(err, dashboard) {
    dashboard.forEach(function(helicopter) {
      helicopter.history.forEach(function(usageHistoryEntry){
        totalRevenue += parseInt(usageHistoryEntry[0])
      })
    })
    if (err)
      res.send(err);
    res.json(totalRevenue);
  });
};