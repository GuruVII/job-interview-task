import helicoptersHtml from './helicopters.html';
/* @ngInject */
let helicoptersComponent = {
  template: helicoptersHtml,
  controllerAs: 'helicopters',
  controller: function(helicoptersService, reloadService, $interval, $scope) {
    const vm = this;
    vm.helicopter = [];
    vm.getHelicopters = getHelicopters;
    function getHelicopters () {
      helicoptersService.helicopter().then(function successCallback(response) {
          //First function handles success
        vm.helicopter = [ ...response.data ];
      }, function errorCallback(response) {
             //Second function handles error
        vm.helicopter = 'An error has occured';
      });
    }
    $scope.$on('refreshHelicopters', function () {
      vm.getHelicopters();
    })
    //reloads data every minute
    $interval(function () {
      vm.getHelicopters();
      reloadService.reloadRevenue();
    }, 60000);
    vm.getHelicopters();
  }
}
export default helicoptersComponent;
