'use strict';
module.exports = function(app) {
  var helicopter = require('../controllers/helicopterController');

  // helciopter Routes
  app.route('/helicopters')
    .get(helicopter.listAllHelicopters)
    .post(helicopter.createHelicopter);

  app.route('/helicopters/revenue')
    .get(helicopter.totalRevenue);

  app.route('/helicopters/:helicopterId')
    .get(helicopter.readHelicopter)
    .put(helicopter.updateHelicopterHistory)
    .delete(helicopter.deleteHelicopter);

  app.route('/helicopterCancel/:helicopterId')
      .put(helicopter.cancelHelicopter);
};
