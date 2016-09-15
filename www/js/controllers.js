angular.module('triviaUTN.controllers', [])

.controller('TriviaCtrl', function($scope, $ionicModal, $timeout) {

  $scope.loginData = {};
  $scope.uauarioActual = "ad";
  /* --- LOGUEO --- */

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLoguin = modal;
  });
  //Cerrar
  $scope.cerrarLogin = function() {
    $scope.modalLoguin.hide();
  };
  //Mostrar
  $scope.login = function() {
    $scope.cerrarRegistro();
    $scope.modalLoguin.show();
  };
  //Eenviar
  $scope.enviarLogin = function() {

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.cerrarLogin();
    }, 1000);
  };

  /* --- REGISTRO --- */
  $scope.dataForm = {};

  $ionicModal.fromTemplateUrl('templates/registro.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalRegistro = modal;
  });
  //Cerrar
  $scope.cerrarRegistro = function() {
    $scope.modalRegistro.hide();
  };
  //Mostrar
  $scope.registro = function() {
    $scope.cerrarLogin();
    $scope.modalRegistro.show();
  };
  //Enviar
  $scope.enviarRegistro = function() {

    //Verificamos que todos los campos esten completos
    /*if($scope.dataForm.usuario == "" || $scope.dataForm.contra1 == "" || $scope.dataForm.contra2 == "")
    {
      alert("Todos los campso deben estar completos");
      return;
    }
    
    REVISAR EN ETAPA DE DISENIO: http://stackoverflow.com/questions/16691778/check-if-a-input-box-is-empty

    */
    //Verificamos que las contraseñas sean iguales
    if($scope.dataForm.contra1 != $scope.dataForm.contra2)
    {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Verificamos que el usuario no fue ingresado previamente
    var conexFirebase = new Firebase('https://usuarios-trivia.firebaseio.com/');
    conexFirebase.once('value').then(function(snapshot) {
    var username = snapshot.val().usuario;
    console.log(username);
    }); //Objeto firebase
    /*if(conexFirebase.snapshot.val().usuario)
    {
      console.log(conexFirebase.snapshot.val().usuario);
    }*/

    //Guardamos el usuario en FireBase
    var conexFirebase = new Firebase('https://usuarios-trivia.firebaseio.com/')
    conexFirebase.push({usuario:$scope.dataForm.usuario, contra:$scope.dataForm.contra1});

    //Guardamos en variable $scope
    $scope.usuarioActual = $scope.dataForm.usuario;


    /*$timeout(function() {
      $scope.cerrarRegistro();
    }, 1000);*/
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

      var aleatorio = Math.floor((Math.random() * response.data.length)); //Numero aleatorio
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
