import dashboardHtml from './dashboard.html';
import Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts)

/* @ngInject */
let dashboardComponent = {
  template: dashboardHtml,
  controllerAs: 'dashboard',
  controller: function(dashboardService, reloadService, $interval, $scope, $window) {
    const vm = this;
    vm.currentlyRentedHelicopters = 0;
    vm.avgRevenuePerMinute = 0;
    vm.mostRentedHelicopter = 'Unknown'
    vm.graphData = [];


    vm.numberOfCurrentlyRentedHelicopters = numberOfCurrentlyRentedHelicopters;
    vm.revenueLastHourPerMin = revenueLastHourPerMin;
    vm.getMostRentedHelicopter = getMostRentedHelicopter;
    vm.createGraph = createGraph;
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

    function createGraph () {
      dashboardService.numberOfHelicoptersFlownLast3h().then(function successCallback(response) {
        let threeHoursInMS = 10800000
        let timestamp = Math.floor(Date.now() / 1000) * 1000;
        let graphData = [ ...response.data ];
        Highcharts.chart('dashboard-graph', {
          chart: {
            type: 'column',
            height: 200,
          },
          title: {
            text: 'Number of helicopters used in the last 3h'
          },
          legend: {
            enabled: false
          },
          xAxis: {
            type: 'datetime',
            min: timestamp - threeHoursInMS,
            max: timestamp + 60000
          },
          tooltip: {
            pointFormat: 'number of helicopters: {point.y}',
            xDateFormat: '%H:%M:%S'
          },
          yAxis: {
            title: {
              text: 'helicopters used',
            },
            minRange: 3,
            min: 0,
            tickInterval: 1,
          },
          series: [ {
            data: graphData,
            name: 'Number of helicopters flown in the last 3h',
            color: '#702963',
            lineWidth: 0,
            marker: {
              enabled: true,
              radius: 1
            },
            states: {
              hover: {
                lineWidthPlus: 0
              }
            }
          } ],
          exporting: {
            buttons: {
              contextButton: {
                enabled: false
              },
              refreshButton: {
                y: 10,
                _titleKey: 'Refresh',
                onclick: function () {
                  vm.createGraph();
                },
                text: 'Refresh'
              }
            }
          },
          lang: {
            Refresh: 'Refresh'
          },
        });
        //workaround due to problems in chrome
        let resizeEvent = new Event('resize');
        $window.dispatchEvent(resizeEvent);
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    function startDashboard() {
      vm.numberOfCurrentlyRentedHelicopters();
      vm.revenueLastHourPerMin();
      vm.getMostRentedHelicopter()
    }

    vm.createGraph();
    //reloads data every 10 seconds
    $interval(function () {
      vm.startDashboard()
      reloadService.reloadRevenue();
    }, 10000);
    vm.startDashboard()
  }
}
export default dashboardComponent;
