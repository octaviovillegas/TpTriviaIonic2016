angular.module('triviaUTN.controllers', [])

.controller('TriviaCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on trivia start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('InicioCtrl', function($scope) {

})

.controller('JuegoCtrl', function($scope, $http) {

  //Cargar datos de la pregunta
  $scope.preguntaJuego = [];
  $http({
    method: 'GET',
    url: './preguntas.json'
  }).then(function successCallback(response) {

      aleatorio = Math.floor((Math.random() * response.data.length)); //Numero aleatorio
      $scope.preguntaJuego.push(response.data[aleatorio]); //Pregunta aleatoria
      console.log($scope.preguntaJuego);
    }, function errorCallback(response) {
      console.log(response);
    });

  //Comprobar si es correcta
  $scope.esCorrecta = function(num){
    if($scope.preguntaJuego[0].correcta == num)
      alert("CORRECTA");
    else 
      alert("INCORRECTA");
  }


});
