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
      .when('/lists', {
          templateUrl: 'partials/lists.html',
          controller: 'ListsCtrl'})
      .when('/projectcopy/:id', {
          templateUrl: 'partials/projectcopy.html',
          controller: 'ProjectCopyCtrl'})
      .when('/myprojectdashboard/:id', {
          templateUrl: 'partials/myProjectDashboard.html',
          controller: 'MyProjectDashboardCtrl'})
      .when('/projects/:id/edit', {
          templateUrl: 'partials/projectdashboard.html',
          controller: 'ProjectDashboardCtrl'})
      .otherwise({redirectTo: '/objects'});
}]);
