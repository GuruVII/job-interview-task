import angular from 'angular';
import component from './dashboard.component';
import service from './dashboard.service';
import reloadService from '../../globalReloadService'
/* @ngInject */
angular
  .module('dashboard', [
  ])
  .component('dashboard', component)
  .factory('dashboardService', service)
  .factory('reloadService', reloadService)
