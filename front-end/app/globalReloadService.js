function globalReloadService($rootScope) {
  return {
    reloadRevenue: () => {
      $rootScope.$broadcast('reloadRevenue');
    },
    reloadAll: () => {
      $rootScope.$broadcast('reloadRevene');
    },
  }
}
/* @ngInject */
export default globalReloadService
