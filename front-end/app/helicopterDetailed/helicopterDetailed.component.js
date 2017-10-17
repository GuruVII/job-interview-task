import helicopterDetailedHtml from './helicopterDetailed.html';
import Highcharts from 'highcharts';

/* @ngInject */
let helicopterDetailedComponent = {
  template: helicopterDetailedHtml,
  controllerAs: 'helicopterDetailed',
  controller: function($stateParams, helicopterDetailedService, reloadService, $interval) {
    const vm = this;
    vm.getEstimateForm = false;
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
    vm.stopRentingProcess = stopRentingProcess;
    vm.getOneRevenue = getOneRevenue;

    //get helicopter data;
    vm.getHelicopterDetails();
    function stopRentingProcess() {
      vm.rentTime = null;
      vm.name = '';
      vm.estimate.total = 0;
      vm.getEstimateForm = false;
      vm.isEmpty = true;
    }

    //workaround due to problems with validation
    function checkIfEmpty() {
      if (document.getElementById('rentTime').classList.contains('ng-empty')) {
        vm.isEmpty = true;
      } else {
        vm.isEmpty = false;
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
    //function that sends the $http.put reuqest to rent the helicopter
    function rentHelicopter () {
      let data = `${vm.estimate.total}//${Math.floor(Date.now() / 1000)}//${vm.rentTime}//${vm.name}`
      helicopterDetailedService.helicopterRent(vm.id, data).then(function successCallback(response) {
        console.log(response);
        vm.stopRentingProcess();
        vm.getHelicopterDetails();
        reloadService.reloadRevenue();
      }, function errorCallback(response) {
        console.log(response)
      });
    }
    // function that retires the helicopter
    function retireHelicopter () {
      helicopterDetailedService.helicopterRetire(vm.id).then(function successCallback(response) {
        console.log(response);
        console.log(`helicopter ${vm.id} has retired`)
      }, function errorCallback(response) {
        console.log(response)
      });
    }

    // function that allows of to cancel helicopter rentals
    function cancelHelicopter(index) {
      //sets the revenue from flight to 500, and sets status to -1, which the browser translates into the word canceled
      vm.data.history[index][0] = 500;
      vm.data.history[index][2] = -1;
      //mongoose documentation states it is impossible to update an array inside an array, so we are just going to overwrite it
      helicopterDetailedService.helicopterCancel(vm.id, vm.data.history).then(function successCallback(response) {
        reloadService.reloadRevenue();
        vm.getOneRevenue();
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
    }
    //get revenue of a single helicopter
    function getOneRevenue () {
      vm.totalRevenue = 0;
      vm.data.history.forEach(function(currentValue) {
        vm.totalRevenue += parseInt(currentValue[0])
      });
    }
    //function that calls up helicopter details
    function getHelicopterDetails () {
      helicopterDetailedService.helicopter(vm.id).then(function(response) {
        vm.data = response.data;
        vm.getOneRevenue();
        //First function handles success
      }, function(response) {
               //Second function handles error
        vm.helicopter = 'An error has occured';
      });
    }
    Highcharts.chart('graph', {
      title: {
        text: 'Helicopter usage through time'
      },

      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },
      series: [ {
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      } ]
    });

    //refreshes data from every minute
    $interval(function () {
      vm.getHelicopterDetails();
      reloadService.reloadRevenue();
    }, 60000);
  }


}

export default helicopterDetailedComponent;
