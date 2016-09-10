// Ionic triviaUTN trivia

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'triviaUTN' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'triviaUTN.controllers' is found in controllers.js
angular.module('triviaUTN', ['ionic', 'triviaUTN.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('trivia', {
    url: '/trivia',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'TriviaCtrl'
  })
  
    .state('trivia.inicio', {
      url: '/inicio',
      views: {
        'menuContent': {
          templateUrl: 'templates/inicio.html',
          controller: 'InicioCtrl'
        }
      }
    })

    .state('trivia.juego', {
      url: '/juego',
      views: {
        'menuContent': {
          templateUrl: 'templates/juego.html',
          controller: 'JuegoCtrl'
        }
      }
    });

  //Si ninguna URL coincide, se direcciona a: 
  $urlRouterProvider.otherwise('/trivia/inicio');
});
