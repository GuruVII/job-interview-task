function helicopterDetailedService($http) {
  return {
    helicopter: (id) => {
      return $http.get(`http://localhost:3001/helicopters/${id}`)
    },
    helicopterRent: (id, rent) => {
      let data = {};
      data.history = rent;
      return $http.put(`http://localhost:3001/helicopters/${id}`, data)
    },
    helicopterCancel: (id, history) => {
      let data = {};
      data.history = history;
      return $http.put(`http://localhost:3001/helicopters/cancel/${id}`, data)
    },
  }
}
/* @ngInject */
export default helicopterDetailedService;
