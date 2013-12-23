'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap',
  'common.master'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/objects', {
          templateUrl: 'partials/allobjects.html',
          controller: 'ObjectsCtrl'})
      .when('/objects/:id/edit', {
          templateUrl: 'partials/objectedit.html',
          controller: 'ObjectsCtrl'})
      .when('/objects/:id/views', {
          templateUrl: 'partials/objectviews.html',
          controller: 'ObjectsCtrl'})
      .when('/projects', {
          templateUrl: 'partials/objectedit.html',
          controller: 'ProjectsCtrl'})
      .otherwise({redirectTo: '/objects'});
}]);
