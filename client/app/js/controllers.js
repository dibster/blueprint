'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ObjectsCtrl', ['$scope', 'KaboodleObjects', 'KaboodleTypes', '$routeParams', function($scope, KaboodleObjects, KaboodleTypes, $routeParams) {
        $scope.data = {};
        $scope.data.selectedType="";

        KaboodleObjects.query(function(response) {
            $scope.data.objects = response;
        });
        KaboodleTypes.query(function(response) {
            $scope.data.types = response;
        });

        $scope.objectId = $routeParams.id;
        console.log($scope.objectId);

        $scope.findOne = function() {
            KaboodleObjects.get({id : $scope.objectId},function(object) {
                $scope.object = object;
            });
        };

        $scope.create = function() {

            var object = new KaboodleObjects({
                name: this.object.name,
                type: this.data.selectedType
            });

            $scope.data.object = object.$save(function(response) {
                return response;
                }).then(function(response){
                    $scope.object = response;
                    $scope.data.objects.push($scope.object);
            });

            this.object.name = "";
        };

        $scope.copySelectedObject = function(selectedItem) {
            this.object.fields = selectedItem.fields;
            this.object.views = selectedItem.views;
            this.object.$update(function(response) {
                console.log('saved');
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
