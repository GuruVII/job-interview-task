'use strict';
module.exports = function(app) {
  var helicopter = require('../controllers/helicopterController');

  // helciopter Routes
  app.route('/helicopters')
    .get(helicopter.listAllHelicopters)
    .post(helicopter.createHelicopter)

  app.route('/helicopter/:helicopterId')
    .get(helicopter.readHelicopter)
    .put(helicopter.rentHelicopter)
    .delete(helicopter.deleteHelicopter)

  app.route('/helicopter/cancel/:helicopterId')
      .put(helicopter.cancelHelicopter)

  app.route('/helicopter/retire/:helicopterId')
    .put(helicopter.retireHelicopter)
    
  app.route('/helicopter/graph/:helicopterId')
    .get(helicopter.getGraphData) 
};
