function revenueService($http) {
  return {
    revenue: () => {
      return $http.get('http://localhost:3001/dashboard/revenue')
    }
  }
}
/* @ngInject */
export default revenueService;
