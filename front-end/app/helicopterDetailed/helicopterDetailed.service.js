function helicopterDetailedService($http) {
  //https://front-end.guru/helicopters
  //https://localhost:3001
  return {
    helicopter: (id) => {
      return $http.get(`http://localhost:3001/helicopter/${id}`)
    },
    helicopterRent: (id, rent) => {
      let data = {};
      data.history = rent;
      return $http.put(`http://localhost:3001/helicopter/${id}`, data)
    },
    helicopterCancel: (id, history) => {
      let data = {};
      data.history = history;
      return $http.put(`http://localhost:3001/helicopter/cancel/${id}`, data)
    },
    helicopterRetire: (id) => {
      let data = {};
      data.retired = true;
      return $http.put(`http://localhost:3001/helicopter/retire/${id}`, data)
    },
    getGraphData: (id) => {
      let data = {};
      return $http.get(`http://localhost:3001/helicopter/graph/${id}`, data)
    },
  }
}
/* @ngInject */
export default helicopterDetailedService;
