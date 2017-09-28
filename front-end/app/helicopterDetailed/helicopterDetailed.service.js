function helicopterDetailedService($http) {
  return {
    helicopter: (id) => {
      return $http.get(`http://localhost:3000/helicopters/${id}`)
    }
  }
}
/* @ngInject */
export default helicopterDetailedService;
