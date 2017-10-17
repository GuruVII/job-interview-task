'use strict';
module.exports = function(app) {
  var helicopter = require('../controllers/helicopterController');

  // helciopter Routes
  app.route('/helicopters')
    .get(helicopter.listAllHelicopters)
    .post(helicopter.createHelicopter)

  app.route('/helicopters/:helicopterId')
    .get(helicopter.readHelicopter)
    .put(helicopter.rentHelicopter)
    .delete(helicopter.deleteHelicopter)

  app.route('/helicopters/cancel/:helicopterId')
      .put(helicopter.cancelHelicopter)

  app.route('/helicopters/retire/:helicopterId')
    .put(helicopter.retireHelicopter)
};
