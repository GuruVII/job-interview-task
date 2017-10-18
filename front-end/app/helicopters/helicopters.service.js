function helicoptersService($http) {
  return {
    helicopter: () => {
      return $http.get('http://localhost:3001/helicopters')
    },
  }
}
/* @ngInject */
export default helicoptersService;
