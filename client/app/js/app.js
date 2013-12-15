'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/objects', {
      templateUrl: 'partials/allobjects.html',
      controller: 'ObjectsCtrl'});
  $routeProvider.when('/projects', {
      templateUrl: 'partials/projects.html',
      controller: 'ProjectsCtrl'});
  $routeProvider.otherwise({redirectTo: '/objects'});
}]);
