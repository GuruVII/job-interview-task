function helicoptersService($http) {
  return {
    helicopter: () => {
      return $http.get('http://localhost:3000/helicopters')
    }
  }
}
/* @ngInject */
export default helicoptersService;
