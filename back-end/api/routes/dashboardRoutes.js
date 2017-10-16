'use strict';
module.exports = function(app) {
  var dashboard = require('../controllers/dashboardController');

  // dashboard Routes


  app.route('/dashboard/revenue')
    .get(dashboard.totalRevenue)
};
