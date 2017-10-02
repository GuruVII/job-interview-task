import revenueHtml from './revenue.html';
/* @ngInject */
let revenueComponent = {
  template: revenueHtml,
  controllerAs: 'revenue',
  controller: function(revenueService, $scope, reloadService) {
    const vm = this;
    vm.totalRevenue = 0;
    vm.getRevenue = getRevenue;
    //
    vm.getRevenue();
    //listens for events telling it to update the revenue
    $scope.$on('reloadRevenue', function (event) {
      vm.getRevenue();
    });

    function getRevenue () {
      revenueService.revenue().then(function(response) {
        //First function handles success
        vm.totalRevenue = response.data;
      }, function(response) {
             //Second function handles error
        vm.totalRevenue = 'REVENUE UNKNOWN';
      });
    }
  }

}
export default revenueComponent;
