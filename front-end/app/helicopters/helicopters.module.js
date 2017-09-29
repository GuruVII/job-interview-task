import angular from 'angular';
import component from './helicopters.component';
import service from './helicopters.service';
import addHelicopter from './addHelicopter/addHelicopter.module'
/* @ngInject */
angular
  .module('helicopters', [
    'addHelicopter'
  ])
  .component('helicopters', component)
  .factory('helicoptersService', service)
