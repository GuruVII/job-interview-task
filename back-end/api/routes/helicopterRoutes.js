'use strict';
module.exports = function(app) {
  var helicopter = require('../controllers/helicopterController');

  // todoList Routes
  app.route('/helicopters')
    .get(helicopter.listAllHelicopters)
    .post(helicopter.createHelicopter);


  app.route('/helicopters/:helicopterID')
    .get(helicopter.readHelicopter)
    .put(helicopter.updateHelicopter)
    .delete(helicopter.deleteHelicopter);
};
