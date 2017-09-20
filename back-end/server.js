var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Helicopter = require('./api/models/helicopterModel')
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/helicopters'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//importing route
var routes = require('./api/routes/helicopterRoutes');
routes(app); //register the route


app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('helicopter list RESTful API server started on: ' + port);