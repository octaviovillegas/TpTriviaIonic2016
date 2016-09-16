angular.module('app.controllers', [])

.controller('menuCtrl', function ($scope, $stateParams, datosUsuarioVal) {
	$scope.cerrarSesion = function(){
		datosUsuarioVal.usuarioActual = null;
		location.href = "#/login";
	}
})

.controller('loginCtrl', function ($scope, $stateParams, datosUsuarioVal) {

	$scope.submitLogin = function(usr){
		var ref = new Firebase("https://usuarios-trivia.firebaseio.com");
		ref.on("value", function(snapshot) {
			listaUsuarios = snapshot.val();
  			$.each(listaUsuarios, function(i){ //Recorremos la lista de usuarios
				if(listaUsuarios[i].usuario == usr.usuario && listaUsuarios[i].contra == usr.pass){ 
				//Si coinciden los datos...
					datosUsuarioVal.usuarioActual = usr.usuario;
    				location.href = "#/trivia-menu/inicio";	
    				return;
    				return;
				}
			})
			alert("Usuario y/o contraseña incorrectos");
		}, function (errorObject) {
  			console.log("Error en la lectura de la base: " + errorObject.code);
		});		
	}
})
   
.controller('registroCtrl',function ($scope, $stateParams, datosUsuarioVal, $timeout) {

	$scope.pathImagen = "img/bien.png";
	var ref = new Firebase("https://usuarios-trivia.firebaseio.com");

	//Verificar que el usuario ingresado no existe aun
	$scope.usuarioExiste = function(usrIngresado){
		ref.on("value", function(snapshot) {
			listaUsuarios = snapshot.val();
			var pathImagen = "img/bien.png";
  			$.each(listaUsuarios, function(i){ //Recorremos la lista de usuarios
				if(listaUsuarios[i].usuario == usrIngresado){ //Si coincide alguno con el ingresado
					pathImagen = "img/mal.png"; //Se cambia a mal
				}
			})
			$timeout(function(){  
				$scope.$apply(function() {
        			$scope.pathImagen = pathImagen; 
    			})
    		}); 
		}, function (errorObject) {
  			console.log("Error en la lectura de la base: " + errorObject.code);
		});		
	}

	//Cargar el nuevo usuario
	$scope.submitReg = function(usr){
		//Verificar
		if(usr.pass1 != usr.pass2){
			alert("contras error");
			return;
		}
		$scope.usuarioExiste(usr.usuario);
		if($scope.pathImagen == "img/mal.png"){
			alert("path error");
			return;
		}
		//Cargar datos a firebase
		ref.push({
    		usuario: usr.usuario,
    		contra: usr.pass1
  		});
  		//Cargar usuarioActual
  		datosUsuarioVal.usuarioActual = usr.usuario;
  		console.log(datosUsuarioVal.usuarioActual);
  		//Saludar
  		alert("Bienvenidx " + usr.usuario);
  		location.href = "#/trivia-menu/inicio";	
	}

})
  
.controller('triviaUTNCtrl', function ($scope, $stateParams, datosUsuarioVal, preguntasVal, $timeout) {

	$scope.$on('$locationChangeStart', function(event) {
		//Guardar usuario actual
		$scope.usuarioActual = datosUsuarioVal.usuarioActual;

		//Cargar ultimos resultados
		var ref = new Firebase("https://resultados-trivia.firebaseio.com");
		ref.on("value", function(snapshot) {
			var resultadosCrudos = snapshot.val();
			var resultados = [];
			var cont = 0;
			$.each(resultadosCrudos, function(i){
				resultados[cont] = resultadosCrudos[i];
				cont ++;
			})
			$timeout(function(){  
				$scope.$apply(function() {
        			//Cargamos los ultimos 3 en scope
					$scope.resultados1 = resultados[resultados.length-1];
					$scope.resultados2 = resultados[resultados.length-2];
					$scope.resultados3 = resultados[resultados.length-3];
    			})
    		}); 
		});

		//Cargar preguntas en el value
		var ref = new Firebase("https://preguntas-trivia.firebaseio.com");
		ref.on("value", function(snapshot) {
			var preguntasRecibidas = snapshot.val(); //Lista de preguntas
			preguntasVal.preguntas = [];
			var cont = 0;
			$.each(preguntasRecibidas, function(i){
				preguntasVal.preguntas[cont] = preguntasRecibidas[i];
				cont ++;
			})
			console.log(preguntasVal);
		}, function (errorObject) {
  			console.log("Error en la lectura de la base: " + errorObject.code);
		});	
	});
})
   
.controller('presentacionCtrl', function ($scope, $stateParams) {

})
   
.controller('miGithubCtrl', function ($scope, $stateParams) {

})
   
.controller('juegoCtrl', function ($scope, $stateParams, preguntasVal, $timeout, datosUsuarioVal) {

	var preguntasTotales;
	$scope.preguntasCorrectas;

	function cargarPregunta(){

		//Volvemos a poner los botones en verde
		$("#juego-button1").attr('class', 'button button-balanced button-large button-block');
		$("#juego-button2").attr('class', 'button button-balanced button-large button-block');
		$("#juego-button3").attr('class', 'button button-balanced button-large button-block');

		//Cargamos la pregunta actual
		var aleatorio = Math.floor((Math.random() * preguntasVal.preguntas.length));
		console.log(preguntasVal.preguntas);
		if (typeof preguntasVal.preguntas[aleatorio] != 'undefined' && preguntasVal.preguntas[aleatorio] != null) {
			var nueva = preguntasVal.preguntas[aleatorio];
			$timeout(function(){  
				$scope.$apply(function() {
        			$scope.preguntaJuego = nueva; //Cargamos la nueva pregunta
    			})
    		}); 
    		//Indicamos que se vio una pregunta mas
    		preguntasTotales++;
    		//La eliminamos de la lista
			preguntasVal.preguntas[aleatorio] = null;
		}else{
			cargarPregunta();
			return;
		}
	}
	$scope.$on('$locationChangeStart', function(event) {
    	//Resetear variables
		preguntasTotales = 0;
		$timeout(function(){  
			$scope.$apply(function() {
        		$scope.preguntasCorrectas = 0;
    		})
    	}); 
    	cargarPregunta(); //Cargar por primera vez
 	});

	//Comprobar si la respuesta es la correcta
	$scope.esCorrecta = function(num){
		if(num == $scope.preguntaJuego.correcta){
			alert("Es correcta :D");
			vibrarUnaVez();
			$timeout(function(){  
				$scope.$apply(function() {
        			$scope.preguntasCorrectas++; //Indicamos que una pregunta mas se contesto bien
    			})
    		}); 
		}else{
			alert("Es incorrecta D:");
			vibrarUnaVez();
			$timeout(function() {
     			vibrarUnaVez();
    		}, 300);
			var id;
			if(num == 1){
				id = "#juego-button1";
			}else if(num == 2){
				id = "#juego-button2";
			}else{
				id = "#juego-button3";
			}
			$(id).attr('class', 'button button-assertive button-large button-block');
		}
		if(preguntasTotales < 5){ //Si aun quedan preguntas
			$timeout(function(){  
        		cargarPregunta();
    		}, 1000); 
		}else{ //Si ya se cargaron todas
				//Cargar resultados
				var ref = new Firebase("https://resultados-trivia.firebaseio.com");
				ref.push({
					usuario: datosUsuarioVal.usuarioActual,
					correctas: $scope.preguntasCorrectas
				});
			$timeout(function(){
				//Anunciar final
				alert("Juego terminado");
				alert("Puntaje: "+$scope.preguntasCorrectas+"/5");
    			//Redireccionar
        		location.href = "#/trivia-menu/inicio";
			}, 1500);
		}

	}

	function vibrarUnaVez(){
		try{
    		// Vibrar por 100ms
    		$cordovaVibration.vibrate(100);
    	}catch(e){
    		console.log("No se encuentra el hardware necesario.");
    	}
	}

})
 