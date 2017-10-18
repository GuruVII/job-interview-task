import dashboardHtml from './dashboard.html';
/* @ngInject */
let dashboardComponent = {
  template: dashboardHtml,
  controllerAs: 'dashboard',
  controller: function(dashboardService, reloadService, $interval, $scope) {
    const vm = this;
    vm.currentlyRentedHelicopters = 0;
    vm.avgRevenuePerMinute = 0;
    vm.mostRentedHelicopter = 'Unknown'


    vm.numberOfCurrentlyRentedHelicopters = numberOfCurrentlyRentedHelicopters;
    vm.revenueLastHourPerMin = revenueLastHourPerMin;
    vm.getMostRentedHelicopter = getMostRentedHelicopter;
    vm.startDashboard = startDashboard;

    function numberOfCurrentlyRentedHelicopters() {
      dashboardService.numberOfCurrentlyRentedHelicopters().then(function successCallback(response) {
          //First function handles success
        vm.currentlyRentedHelicopters = response.data;
      }, function errorCallback(response) {
             //Second function handles error
        console.log(response)
      });
    }

    function revenueLastHourPerMin() {
      dashboardService.revenueLastHourPerMin().then(function successCallback(response) {
        //First function handles success
        vm.avgRevenuePerMinute = response.data.revenueLastHourPerMin
      }, function errorCallback(response) {
             //Second function handles error
        console.log(response)
      });
    }

    function getMostRentedHelicopter() {
      dashboardService.mostRentedHelicopter().then(function successCallback(response) {
        vm.mostRentedHelicopter = response.data
      }, function errorCallback(response) {
        //Second function handles error
        console.log(response)
      });
    }
    function startDashboard() {
      vm.numberOfCurrentlyRentedHelicopters();
      vm.revenueLastHourPerMin();
      vm.getMostRentedHelicopter()
    }

    //reloads data every 10 seconds
    $interval(function () {
      vm.startDashboard()
      reloadService.reloadRevenue();
    }, 10000);
    vm.startDashboard()
  }
}
export default dashboardComponent;
