import helicoptersHtml from './helicopters.html';
/* @ngInject */
let helicoptersComponent = {
  template: helicoptersHtml,
  controllerAs: 'helicopters',
  controller: function(helicoptersService) {
    const vm = this;
    vm.title = helicoptersService.title();
    vm.helicopter = [];
    helicoptersService.helicopter().then(function(response) {
          //First function handles success
      vm.helicopter = [ ...response.data ];
    }, function(response) {
             //Second function handles error
      vm.helicopter = 'An error has occured';
    });
  }

}
export default helicoptersComponent;
