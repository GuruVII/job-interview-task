import angular from 'angular';
import component from './helicopterDetailed.component';
import service from './helicopterDetailed.service';
import reloadService from '../globalReloadService';

/* @ngInject */
angular
  .module('helicopterDetailed', [])
  .component('helicopterDetailed', component)
  .factory('helicopterDetailedService', service)
  .factory('reloadService', reloadService)
