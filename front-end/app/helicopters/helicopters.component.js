import helicoptersHtml from './helicopters.html';
/* @ngInject */
let helicoptersComponent = {
  template: helicoptersHtml,
  controllerAs: 'helicopters',
  controller: function(helicoptersService, $rootScope) {
    const vm = this;
    vm.helicopter = [];
    $rootScope.getHelicopters = () => {
      helicoptersService.helicopter().then(function(response) {
          //First function handles success
        vm.helicopter = [ ...response.data ];
      }, function(response) {
             //Second function handles error
        vm.helicopter = 'An error has occured';
      });
    }
    $rootScope.getHelicopters()
  }

}
export default helicoptersComponent;
