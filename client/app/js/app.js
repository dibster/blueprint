'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap',
  'ui.sortable'
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
          controller: 'KaboodleAdminViewCtrl'})
      .when('/projects', {
          templateUrl: 'partials/projects.html',
          controller: 'ProjectsCtrl'})
      .otherwise({redirectTo: '/objects'});
}]);
