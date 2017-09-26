import helicopterDetailedHtml from './helicopterDetailed.html';
/* @ngInject */
let helicopterDetailedComponent = {
  template: helicopterDetailedHtml,
  controllerAs: 'helicopterDetailed',
  controller: function($stateParams) {
    const vm = this;
    this.helicopter = $stateParams.id;
  }

}
export default helicopterDetailedComponent;
