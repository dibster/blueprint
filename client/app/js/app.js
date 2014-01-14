'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap',
  'angularMoment',
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
      .when('/projectcopy/:id', {
          templateUrl: 'partials/projectcopy.html',
          controller: 'ProjectCopyCtrl'})
      .when('/projects/:id/edit', {
          templateUrl: 'partials/projectdashboard.html',
          controller: 'ProjectDashboardCtrl'})
      .otherwise({redirectTo: '/objects'});
}]);
