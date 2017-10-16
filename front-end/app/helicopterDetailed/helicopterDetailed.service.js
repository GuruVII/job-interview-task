function helicopterDetailedService($http) {
  //https://front-end.guru/helicopters
  //https://localhost:3001
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
    helicopterRetire: (id) => {
      let data = {};
      data.retired = true;
      console.log(data)
      return $http.put(`http://localhost:3001/helicopters/retire/${id}`, data)
    },
  }
}
/* @ngInject */
export default helicopterDetailedService;
