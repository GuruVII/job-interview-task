import helicopterDetailedHtml from './helicopterDetailed.html';
import Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);


/* @ngInject */
let helicopterDetailedComponent = {
  template: helicopterDetailedHtml,
  controllerAs: 'helicopterDetailed',
  controller: function($stateParams, helicopterDetailedService, reloadService, $interval, $window) {
    const vm = this;
    vm.getEstimateForm = false;
    vm.getRetireConformation = false;
    vm.id = $stateParams.id;
    vm.totalRevenue = 0;
    vm.data = {};
    vm.rentTime;
    vm.name = '';
    vm.isEmpty = true;
    vm.estimate = {
      total: 0,
    };
    vm.getHelicopterDetails = getHelicopterDetails;
    vm.cancelHelicopter = cancelHelicopter;
    vm.rentHelicopter = rentHelicopter;
    vm.retireHelicopter = retireHelicopter;
    vm.getEstimate = getEstimate;
    vm.childClick = childClick;
    vm.checkIfEmpty = checkIfEmpty;
    vm.endRentingOrRetiringProcess = endRentingOrRetiringProcess;
    vm.getOneRevenue = getOneRevenue;
    vm.createGraph = createGraph;
    vm.getReloadedData = getReloadedData;
    vm.stopScroll = stopScroll;
    vm.checkIfYouCanRent = checkIfYouCanRent;

    //get helicopter data;
    vm.getHelicopterDetails();
    //get graph
    vm.createGraph ();

    function endRentingOrRetiringProcess() {
      vm.rentTime = null;
      vm.name = '';
      vm.estimate.total = 0;
      vm.getEstimateForm = false;
      vm.getRetireConformation = false;
      vm.isEmpty = true;
    }
    //workaround due to problems with validation
    function checkIfEmpty () {
      if (document.getElementById('rentTime').classList.contains('ng-empty')) {
        vm.isEmpty = true;
      } else {
        vm.isEmpty = false;
      }
    }
    function checkIfYouCanRent () {
      if (vm.data.history.length === 0) {
        vm.getEstimateForm = true;
      } else {
        let lastEntry = vm.data.history[vm.data.history.length - 1].end
        let currentTime = Math.floor(Date.now() / 1000);
        if (currentTime < lastEntry) {
          alert(`Sorry, the helicopter is currently in use, it will be avaiable in ${lastEntry - currentTime} seconds.`)
        } else {
          vm.getEstimateForm = true;
        }
      }
    }
    //functions gets estimate, by first checking the total duration and then deciding which cacluation to take
    function getEstimate() {
      vm.estimate.after15Sec = 0;
      if (vm.rentTime > 15) {
        vm.estimate.first15Sec = 15 * 20;
        vm.estimate.after15Sec = (vm.rentTime - 15) * 25
      } else {
        vm.estimate.first15Sec = vm.rentTime * 20;
      }
      vm.estimate.total = vm.estimate.after15Sec + vm.estimate.first15Sec
    }
    //prevents a click on the child from closing the parents
    function childClick ($event) {
      $event.stopPropagation();
    }
    //get revenue of a single helicopter
    function getOneRevenue () {
      vm.totalRevenue = 0;
      vm.data.history.forEach(function(currentValue) {
        if (!currentValue.revenue) {
          currentValue.revenue = 0;
        }
        vm.totalRevenue += parseInt(currentValue.revenue)
      });
    }
    //function that sends the $http.put reuqest to rent the helicopter
    function rentHelicopter () {
      let start = Math.floor(Date.now() / 1000);
      let duration = parseInt(vm.rentTime);
      let end = start + duration;
      let data = { companyName: vm.name, duration: duration, start: start, end: end, revenue: vm.estimate.total }
      helicopterDetailedService.helicopterRent(vm.id, data).then(function successCallback(response) {
        vm.endRentingOrRetiringProcess();
        vm.getHelicopterDetails();
        vm.createGraph();
        reloadService.reloadRevenue();
      }, function errorCallback(response) {
        console.log(response)
      });
    }
    // function that retires the helicopter
    function retireHelicopter () {
      helicopterDetailedService.helicopterRetire(vm.id).then(function successCallback(response) {
        vm.data.retired = true
        console.log(response);
      }, function errorCallback(response) {
        console.log(response)
      });
    }

    // function that allows of to cancel helicopter rentals
    function cancelHelicopter(index) {
      //sets the revenue from flight to 500, and sets status to -1, which the browser translates into the word canceled
      vm.data.history[index].revenue = 500;
      vm.data.history[index].duration = -1;
      vm.data.history[index].end = -1;
      //mongoose documentation states it is impossible to update an array inside an array, so we are just going to overwrite it
      helicopterDetailedService.helicopterCancel(vm.id, vm.data.history).then(function successCallback(response) {
        reloadService.reloadRevenue();
        vm.getReloadedData()
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
    }
    //function that calls up helicopter details
    function getHelicopterDetails () {
      helicopterDetailedService.helicopter(vm.id).then(function successCallback(response) {
        vm.data = response.data;
        vm.getOneRevenue();
        //First function handles success
      }, function errorCallback(response) {
               //Second function handles error
        vm.helicopter = 'An error has occured';
      });
    }

    function createGraph () {
      helicopterDetailedService.getGraphData(vm.id).then(function successCallback(response) {
        let graphData = [ ...response.data ];
        Highcharts.chart('graph', {
          chart: {
            type: 'line',
            height: 400,
          },
          title: {
            text: 'Helicopter usage through time'
          },
          legend: {
            enabled: false
          },
          xAxis: {
            type: 'datetime'
          },
          tooltip: {
            pointFormat: 'Rented for: {point.y}s.',
          },
          yAxis: {
            title: {
              text: 'seconds'
            },
            minRange: 100,
            min: 0,
            tickInterval: 200,
          },
          series: [ {
            name: 'Rented for',
            color: '#702963',
            data: graphData
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
        //workaround for graph overflowing in chrome
        let resizeEvent = new Event('resize');
        $window.dispatchEvent(resizeEvent);
      }, function errorCallback(response) {
        console.log(response);
      });
    }
    function stopScroll (event) {
      event.preventDefault();
    }
    function getReloadedData () {
      vm.createGraph ();
      vm.getOneRevenue ();
    }

    //refreshes data from every minute
    $interval(function () {
      vm.getHelicopterDetails();
      reloadService.reloadRevenue();
    }, 60000);
  }


}

export default helicopterDetailedComponent;
