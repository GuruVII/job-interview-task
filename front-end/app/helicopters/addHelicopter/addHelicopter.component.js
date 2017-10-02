import addHelicopterHtml from './addHelicopter.html';
/* @ngInject */
let addHelicopterComponent = {
  template: addHelicopterHtml,
  controllerAs: 'addHeli',
  controller: function(addHelicopterService, $scope, $rootScope) {
    const vm = this;
    vm.nameSelectionArray =
    [['Flying', 'Hovering', 'Speeding', 'Fast', 'Reliable', 'Zrakomlat', 'Indepedant', 'Voyager', 'Enteprise', 'Defiant', 'Rogue', 'Black', 'Big'],
    ['eagle', 'hawk', 'helicopter', 'osprey', 'sparrow', 'bird', 'dog', 'ostrich', 'Berliner', 'potato', 'monkey']];
    vm.picture =  ['BellHelicopter', 'BellHelicopter430', 'Eurocopter1', 'Eurocopter2', 'Sikorsky'];
    vm.addNewHelicopter = addNewHelicopter;
    ///////

    function createRandomInformation(from, to) {
      return Math.floor((Math.random() * to) + from);
    }
    function selectedRandomValueInArray(array) {
      let tempArray = [ ...array ]
      return Math.floor(Math.random() * (tempArray.length - 1))
    }
    function addNewHelicopter() {
      //creates semi-random helicopter data
      let name = vm.nameSelectionArray[0][selectedRandomValueInArray(vm.nameSelectionArray[0])] +
      ' ' + vm.nameSelectionArray[1][selectedRandomValueInArray(vm.nameSelectionArray[1])] +
      ' ' + Math.floor((Math.random() * 25) + 1);
      let maxSpeed = createRandomInformation(150, 350)
      let lift = createRandomInformation(1, 50)
      let maxPassangers = createRandomInformation(1, 25)
      let picture = vm.picture[selectedRandomValueInArray(vm.picture)]
      let data = {name, lift, maxPassangers, maxSpeed, picture}

      addHelicopterService.addHelicopter(data).then(function successCallback(response) {
        //if the post is sucessful, this calls the function that does another $http.get from the server
        $rootScope.getHelicopters();
      }, function errorCallback(response) {
        console.log(response)
      });
    }
  }

}
export default addHelicopterComponent;
