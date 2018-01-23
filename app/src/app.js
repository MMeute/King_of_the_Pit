var app = angular.module('kingOfThePitApp', ['ui-router'])

app.config(function($stateProvider, $ulrRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state("login", {
            url: "/",
            templateUrl: "./src/views/login.html",
            controller: "loginController"
        })
        .state("profile", {
            url: "/",
            templateUrl: "./src/views/profile.html",
            controller: "profileController"
        })
})
app.controller("homeController", function($scope, homeService) {
    $scope.person = homeService.getPerson()
})