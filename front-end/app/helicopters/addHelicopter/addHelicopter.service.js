function addHelicopterService($http) {
  return {
    addHelicopter: (data) => {
      return $http.post('http://localhost:3000/helicopters/', data)
    }
  }
}
/* @ngInject */
export default addHelicopterService;
