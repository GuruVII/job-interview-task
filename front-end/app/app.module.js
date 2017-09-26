import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import helicopters from './helicopters/helicopters.module';
import helicopterDetailed from './helicopterDetailed/helicopterDetailed.module'
import routing from './routing';

require('../node_modules/material-design-lite/material.min.css')
require('./main.scss');


angular
.module('app', [
  uirouter,
  'helicopters',
  'helicopterDetailed'
])
.config(routing)
