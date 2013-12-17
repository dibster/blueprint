'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ObjectsCtrl', ['$scope', 'KaboodleObjects', 'KaboodleTypes', '$routeParams',  function($scope, KaboodleObjects, KaboodleTypes, $routeParams) {
        $scope.data = {};
        KaboodleObjects.query(function(response) {
            // Assign the response INSIDE the callback
            $scope.data.objects = response;
        });
        KaboodleTypes.query(function(response) {
            // Assign the response INSIDE the callback
            $scope.data.types = response;
        });

        $scope.objectId = $routeParams.id;
        console.log($scope.objectId);

        $scope.findOne = function() {
            KaboodleObjects.get({id : $scope.objectId},function(object) {
                $scope.object = object;
            });
        };
    }])

    .controller('KaboodleTypesCtrl', ['$scope', 'KaboodleTypes',  function($scope, KaboodleTypes) {
        $scope.data = {};
        KaboodleTypes.query(function(response) {
            // Assign the response INSIDE the callback
            $scope.data.types = response;
        });
    }])

    .controller('ProjectsCtrl', ['$scope', 'KaboodleProjects', function($scope, KaboodleProjects) {
        $scope.data = {};

        KaboodleProjects.query(function(response) {
            $scope.data.projects = response;
        });
    }]);
