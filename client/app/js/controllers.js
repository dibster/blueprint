'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ObjectsCtrl', ['$scope', 'KaboodleObjects',  function($scope, KaboodleObjects) {

        $scope.data = {};

        KaboodleObjects.query(function(response) {
            // Assign the response INSIDE the callback
            $scope.data.objects = response;
        });
    }])

    .controller('ProjectsCtrl', ['$scope', 'KaboodleProjects', function($scope, KaboodleProjects) {
        $scope.data = {};

        KaboodleProjects.query(function(response) {
            $scope.data.projects = response;
        });
    }]);
