'use strict';
module.exports = function(app) {
  var dashboard = require('../controllers/dashboardController');

  // dashboard Routes


  app.route('/dashboard/revenue')
    .get(dashboard.Revenue)

  app.route('/dashboard/currently-rented')
    .get(dashboard.numberOfCurrentlyRented)
   app.route('/dashboard/most-rented')
    .get(dashboard.mostRented)


};
