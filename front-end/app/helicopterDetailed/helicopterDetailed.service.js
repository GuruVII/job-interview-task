function helicopterDetailedService($http) {
  return {
    title: () => { return 'test'},
    helicopter: () => {
      return $http.get('http://localhost:3000/helicopters')
    }
  }
}
/* @ngInject */
export default helicopterDetailedService;
