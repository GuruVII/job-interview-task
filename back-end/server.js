const cors = require('cors');
const express = require('express');
const  app = express();
const  port = process.env.PORT || 3001;
const  mongoose = require('mongoose');
const  Helicopter = require('./api/models/helicopterModel');
const  bodyParser = require('body-parser');

  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/helicopters'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


//importing route
const helicopterRoutes = require('./api/routes/helicopterRoutes');
const dashboardRoutes = require('./api/routes/dashboardRoutes');
helicopterRoutes(app); //register the route
dashboardRoutes(app); //register the route

app.listen(port);

console.log('helicopter list RESTful API server started on: ' + port);