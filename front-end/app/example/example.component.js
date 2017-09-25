import exampleHtml from './example.html';
/* @ngInject */
let exampleComponent = {
  template: exampleHtml,
  controllerAs: 'example',
  controller: function(exampleService) {
    const vm = this;
    vm.title = exampleService.title();
    vm.helicopter = [];
    exampleService.helicopter().then(function(response) {
          //First function handles success
      vm.helicopter = [ ...response.data ];
    }, function(response) {
             //Second function handles error
      vm.helicopter = 'An error has occured';
    });
  }

}
export default exampleComponent;
