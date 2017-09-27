import angular from 'angular';
import component from './revenue.component';
import service from './revenue.service';
/* @ngInject */
angular
  .module('revenue', [])
  .component('revenue', component)
  .factory('revenueService', service)
