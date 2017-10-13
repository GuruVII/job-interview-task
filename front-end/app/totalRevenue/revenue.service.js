function revenueService($http) {
  return {
    revenue: () => {
      return $http.get('http://localhost:3001/helicopters/revenue')
    }
  }
}
/* @ngInject */
export default revenueService;
