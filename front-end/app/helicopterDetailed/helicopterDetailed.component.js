import helicopterDetailedHtml from './helicopterDetailed.html';
/* @ngInject */
let helicopterDetailedComponent = {
  template: helicopterDetailedHtml,
  controllerAs: 'helicopterDetailed',
  controller: function($stateParams, helicopterDetailedService) {
    const vm = this;
    vm.id = $stateParams.id;
    vm.totalRevenue = 0;
    vm.data = {};
    vm.rentTime;
    vm.name;
    vm.cancelHelicopter = cancelHelicopter;
    vm.getEstimate = getEstimate;

    function getEstimate() {
      console.log('test')
    }

    function cancelHelicopter(index) {
      //sets the revenue from flight to 500, and sets status to -1, which the browser transforms into canceled
      vm.data.history[index][0] = 500;
      vm.data.history[index][2] = -1;
      //mongoose documentation states it is impossible to update an array inside an array, so we are just going to overwrite it
      helicopterDetailedService.helicopterCancel(vm.id, vm.data.history).then(function successCallback(response) {
        console.log(response)
      }, function errorCallback(response) {
        console.log(response)
      });
    }
    helicopterDetailedService.helicopter(vm.id).then(function(response) {
      vm.data = response.data;
      vm.data.history.forEach(function(currentValue) {
        vm.totalRevenue += parseInt(currentValue[0])
      });
          //First function handles success
    }, function(response) {
             //Second function handles error
      vm.helicopter = 'An error has occured';
    });
  }

}
export default helicopterDetailedComponent;
