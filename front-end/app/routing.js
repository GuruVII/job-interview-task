function Routes($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/index');
  $urlRouterProvider.when('/', '/index');
  $urlRouterProvider.otherwise('/error');
  $stateProvider.state('error', {
    url: '/error',
    template: '<h2>Error 404</h2>'
  });
  $stateProvider.state('helicopters', {
    url: '/index',
    component: 'helicopters'
  });
  $stateProvider.state('helicopterDetailed', {
    url: '/helicopter/:id',
    component: 'helicopterDetailed'
  });
}
/* @ngInject */
export default Routes;
