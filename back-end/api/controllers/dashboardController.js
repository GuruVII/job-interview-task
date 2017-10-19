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
        totalRevenue += parseInt(usageHistoryEntry.revenue);
        if ((parseInt(usageHistoryEntry.start) + 3600) >= currentTime ){
          revenueLastHourPerMin += parseInt(usageHistoryEntry.revenue);
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
  dashboard.find({ history: { $elemMatch: { end: {$gte: currentTime }}} }, function(err, dashboard) {
    dashboard.forEach(function(helicopter) {
      let helicopterHistoryLength = helicopter.history.length
      //newest one if last, so we search array from last to first.
      for (let i = helicopterHistoryLength - 1; i > 0; i--){
        if ((parseInt(helicopter.history[i].start) + parseInt(helicopter.history[i].duration)) > currentTime){
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
  dashboard.find({history: { $elemMatch: { duration: {$gt: 0 }}}}, function(err, dashboard) {
    dashboard.forEach(function(helicopter) {
      rentedAmount = 0;
      helicopter.history.forEach(function(usageHistoryEntry) {
        if (usageHistoryEntry.duration != -1){
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

exports.numberOfFlowHelicoptersLast3H = function(req, res) {
  let dataSet = {};
  let dataSetArray = []
  let start;
  let end;
  let duration;
  let date
  let threeHoursAgo = Math.floor(Date.now()/1000) - 10800;

  dashboard.find({history: { $elemMatch: { duration: {$gte: 1 }, end: { $gte: threeHoursAgo } }}}, function(err, dashboard) {
    dashboard.forEach(function(helicopter) {
      helicopter.history.forEach(function(historyEntry){
        //check, if the entry is cancled
        if (historyEntry.duration != -1) {
          end =  historyEntry.end;
          //check if the flighted ended less than three hours ago
          if (threeHoursAgo < end) {
            //check if it started less than three hours ago
              if (threeHoursAgo > historyEntry.start){
              start = threeHoursAgo;
              duration = end - start;
            } else {
              start = historyEntry.start;
              duration = historyEntry.duration;
            }
            for (let i = 0; i < duration; i++) {
              date = start + i;
              if (dataSet[date] == undefined) {
                dataSet[date] = 1;
              } else {
                dataSet[date] += 1;
              }
            }
          }
        }
      })
    }) 
    dataSetArray = Object.keys(dataSet).map(key => {
      return [parseInt(key), dataSet[key]]
    })
    if (err)
      res.send(err);
    res.json(dataSetArray);
  });
};