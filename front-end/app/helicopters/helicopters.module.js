import angular from 'angular';
import component from './helicopters.component';
import service from './helicopters.service';
/* @ngInject */
angular
  .module('helicopters', [])
  .component('helicopters', component)
  .factory('helicoptersService', service)
