import angular from 'angular';
import 'material-design-lite/material.min.css';
import 'material-design-lite';
import '../style/app.scss';

//this is a directive
let app = () => {
  return {
    template: require('./app.html'),
    controller: require('./controllers/appController'),
    controllerAs: 'app'
  }
};




angular.module('app', [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

