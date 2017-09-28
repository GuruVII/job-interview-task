function Routes($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/index', '/');
  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise('/error');
  $stateProvider.state('error', {
    url: '/error',
    template: '<h2>Error 404</h2>'
  });
  $stateProvider.state('helicopters', {
    url: '/',
    component: 'helicopters'
  });
  $stateProvider.state('helicopterDetailed', {
    url: '/helicopter/:id',
    component: 'helicopterDetailed'
  });
}
/* @ngInject */
export default Routes;
