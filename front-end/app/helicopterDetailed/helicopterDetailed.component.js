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
