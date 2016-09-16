angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

      .state('menu', {
    url: '/trivia-menu',
    templateUrl: 'templates/menu.html',
    abstract:true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

      .state('menu.triviaUTN', {
    url: '/inicio',
    views: {
      'trivia-menu': {
        templateUrl: 'templates/triviaUTN.html',
        controller: 'triviaUTNCtrl'
      }
    }
  })

  .state('menu.presentacion', {
    url: '/presentacioon',
    views: {
      'trivia-menu': {
        templateUrl: 'templates/presentacion.html',
        controller: 'presentacionCtrl'
      }
    }
  })

  .state('menu.miGithub', {
    url: '/github',
    views: {
      'trivia-menu': {
        templateUrl: 'templates/miGithub.html',
        controller: 'miGithubCtrl'
      }
    }
  })

  .state('juego', {
    url: '/juego',
    templateUrl: 'templates/juego.html',
    controller: 'juegoCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('registro', {
    url: '/registro',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});