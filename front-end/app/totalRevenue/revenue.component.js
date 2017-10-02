import revenueHtml from './revenue.html';
/* @ngInject */
let revenueComponent = {
  template: revenueHtml,
  controllerAs: 'revenue',
  controller: function(revenueService, $scope) {
    const vm = this;
    vm.totalRevenue = 0;

    revenueService.revenue().then(function(response) {
          //First function handles success
      vm.totalRevenue = response.data;
    }, function(response) {
             //Second function handles error
      vm.totalRevenue = 'REVENUE UNKNOWN';
    });
  }

}
export default revenueComponent;
