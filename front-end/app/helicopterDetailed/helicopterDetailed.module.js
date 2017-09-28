import angular from 'angular';
import component from './helicopterDetailed.component';
import service from './helicopterDetailed.service';
/* @ngInject */
angular
  .module('helicopterDetailed', [])
  .component('helicopterDetailed', component)
  .factory('helicopterDetailedService', service)
