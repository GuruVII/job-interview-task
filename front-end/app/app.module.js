import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import example from './example/example.module';

require('./main.scss');
angular.module('app', [
  uirouter,
  'example'
]);
