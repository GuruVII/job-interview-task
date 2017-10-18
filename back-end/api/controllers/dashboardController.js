const mongoose = require('mongoose'),
dashboard = mongoose.model('Helicopters');
//history array of each helicopter [earning, data of rent (unix in seconds), rent time, company name]
exports.Revenue = function(req, res) {
  let totalRevenue = 0;
  let revenueLastHourPerMin = 0;
  let revenue = {};
  let currentTime = Math.floor(Date.now()/1000)
  dashboard.find({}, function(err, dashboard) {
    dashboard.forEach(function(helicopter) {
      helicopter.history.forEach(function(usageHistoryEntry){
        totalRevenue += parseInt(usageHistoryEntry[0]);
        if ((parseInt(usageHistoryEntry[1]) + 3600) >= currentTime ){
          revenueLastHourPerMin += parseInt(usageHistoryEntry[0]);
        }
      })
    })
    revenueLastHourPerMin = revenueLastHourPerMin / 60;
    revenue = {totalRevenue, revenueLastHourPerMin};
    if (err)
      res.send(err);
    res.json(revenue);
  });
};

exports.numberOfCurrentlyRented = function(req, res) {
  let currentTime = Math.floor(Date.now()/1000)
  let currentlyRented = 0;
  dashboard.find({}, function(err, dashboard) {
    dashboard.forEach(function(helicopter) {
      let helicopterHistoryLength = helicopter.history.length
      //newest one if last, so we search array from last to first.
      for (let i = helicopterHistoryLength - 1; i > 0; i--){
        if ((parseInt(helicopter.history[i][1]) + parseInt(helicopter.history[i][2])) > currentTime){
          currentlyRented ++
        } else {
          break
        }
      }
    }) 
    if (err)
      res.send(err);
    res.json(currentlyRented);
  });
};

exports.mostRented = function(req, res) {
  let mostRented = "";
  let mostRentedAmount = 0;
  let rentedAmount;
  dashboard.find({}, function(err, dashboard) {
    dashboard.forEach(function(helicopter) {
      rentedAmount = 0;
      helicopter.history.forEach(function(usageHistoryEntry) {
        if (usageHistoryEntry[2] != -1){
          rentedAmount ++
        }
      })
      if (rentedAmount > mostRentedAmount) {
        mostRentedAmount = rentedAmount;
        mostRented = helicopter.name;
      }
    }) 
    if (err)
      res.send(err);
    res.json(mostRented);
  });
};