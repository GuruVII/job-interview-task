import angular from 'angular';
import component from './addHelicopter.component';
import service from './addHelicopter.service';
/* @ngInject */
angular
  .module('addHelicopter', [])
  .component('addHelicopter', component)
  .factory('addHelicopterService', service)
