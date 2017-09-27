function revenueService($http) {
  return {
    revenue: () => {
      return $http.get('http://localhost:3000/helicopters/revenue')
    }
  }
}
/* @ngInject */
export default revenueService;
