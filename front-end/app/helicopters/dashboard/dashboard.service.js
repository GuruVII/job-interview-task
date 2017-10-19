function dashboardService($http) {
  return {
    numberOfCurrentlyRentedHelicopters: () => {
      return $http.get('http://localhost:3001/dashboard/currently-rented')
    },
    mostRentedHelicopter: () => {
      return $http.get('http://localhost:3001/dashboard/most-rented')
    },
    revenueLastHourPerMin: () => {
      return $http.get('http://localhost:3001/dashboard/revenue')
    },
    numberOfHelicoptersFlownLast3h: () => {
      return $http.get('http://localhost:3001/dashboard/flown-helis-3h')
    }
  }
}
/* @ngInject */
export default dashboardService;
