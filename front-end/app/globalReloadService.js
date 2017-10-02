function globalReloadService($rootScope) {
  return {
    reloadRevenue: () => {
      $rootScope.$broadcast('reloadRevenue');
    },
  }
}
/* @ngInject */
export default globalReloadService
