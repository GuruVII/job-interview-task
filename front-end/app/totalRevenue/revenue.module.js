import angular from 'angular';
import component from './revenue.component';
import service from './revenue.service';
import reloadService from '../globalReloadService'
/* @ngInject */
angular
  .module('revenue', [])
  .component('revenue', component)
  .factory('revenueService', service)
  .factory('reloadService', reloadService)
