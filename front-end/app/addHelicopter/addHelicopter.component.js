import addHelicopterHtml from './addHelicopter.html';
/* @ngInject */
let addHelicopterComponent = {
  template: addHelicopterHtml,
  controllerAs: 'addHeli',
  controller: function(addHelicopterService, $rootScope) {
    const vm = this;
    vm.nameSelectionArray =
    [['Flying', 'Hovering', 'Speeding', 'Fast', 'Reliable', 'Zrakomlat', 'Indepedant', 'Voyager', 'Enteprise', 'Defiant', 'Rogue', 'Black', 'Big'],
    ['eagle', 'hawk', 'helicopter', 'osprey', 'sparrow', 'bird', 'dog', 'ostrich', 'Berliner', 'potato', 'monkey']];
    vm.picture =  ['BellHelicopter', 'BellHelicopter430', 'Eurocopter1', 'Eurocopter2', 'Sikorsky'];

    vm.addNewHelicopter = function() {
      //creates semi-random helicopter data
      let name = this.nameSelectionArray[0][Math.floor(Math.random() * (this.nameSelectionArray[0].length - 1))] +
      ' ' + this.nameSelectionArray[1][Math.floor(Math.random() * (this.nameSelectionArray[1].length - 1))] +
      ' ' + Math.floor((Math.random() * 25) + 1);
      let maxSpeed = Math.floor((Math.random() * 320) + 150);
      let lift = Math.floor((Math.random() * 50) + 1);
      let maxPassangers = Math.floor((Math.random() * 25) + 1);
      let picture = this.picture[Math.floor(Math.random() * (this.picture.length - 1))]
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
