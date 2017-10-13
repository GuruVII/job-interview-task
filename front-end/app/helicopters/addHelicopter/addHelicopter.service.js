function addHelicopterService($http) {
  return {
    addHelicopter: (data) => {
      return $http.post('http://localhost:3001/helicopters/', data)
    }
  }
}
/* @ngInject */
export default addHelicopterService;
