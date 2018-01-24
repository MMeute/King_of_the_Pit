var app = angular.module('kingOfThePitApp', ['ui-router', 'LocalStorageModule'])

app.config(function($stateProvider, $ulrRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "./views/login.html",
            controller: "loginController"
        })
        .state("profile", {
            url: "/profile",
            templateUrl: "./views/profile.html",
            controller: "profileController"
        })
})

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
  });

app.run(['authService', function (authService) {
    authService.getAuthData();
}]);

function authenticate($q, authService, $state, $timeout) {
	console.log(authService.authentication.isAuth);
  if (authService.authentication.isAuth) {
    return $q.when()
  }
	else {
    $timeout(function() {
      $state.go('login')
    })

    return $q.reject()
  }
}
