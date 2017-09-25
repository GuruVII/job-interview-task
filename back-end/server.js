const cors = require('cors');
const express = require('express');
const  app = express();
const  port = process.env.PORT || 3000;
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
const routes = require('./api/routes/helicopterRoutes');
routes(app); //register the route


app.listen(port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('helicopter list RESTful API server started on: ' + port);