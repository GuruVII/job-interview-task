import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import example from './example/example.module';

require('../node_modules/material-design-lite/material.min.css')
require('./main.scss');


angular.module('app', [
  uirouter,
  'example'
]);
