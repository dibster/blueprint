'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ObjectsCtrl',
        ['$scope',
         'KaboodleObjects',
         'KaboodleTypes',
         'KaboodleFieldTypes',
         '$routeParams',
         'DragDropHandler',
         '$location',

        function($scope, KaboodleObjects, KaboodleTypes, KaboodleFieldTypes,  $routeParams, DragDropHandler,  $location) {

        $scope.data = {};
        $scope.newobject = {};
        $scope.object = {};
        $scope.newfield = {};
        $scope.data.selectedType="";
        $scope.newfield.required = "Optional";
        $scope.viewfields = {};
//        $scope.focusInput="true";

        KaboodleObjects.query(function(response) {
            $scope.data.objects = response;
        });
        KaboodleTypes.query(function(response) {
            $scope.data.types = response;
        });

        KaboodleFieldTypes.query(function(response) {
            $scope.data.fieldtypes = response;
        });

        $scope.newfield.req = 'n';
        $scope.newfield.type = 'Text';

        $scope.objectId = $routeParams.id;


        $scope.findOne = function() {
            KaboodleObjects.get({id : $scope.objectId},function(object) {
                $scope.object = object;
            });
        };

        $scope.viewPage = function() {
            KaboodleObjects.get({id : $scope.objectId},function(object) {
                $scope.object = object;
                console.log($scope.object);
            });
        };

        $scope.viewProcessing = function(viewname) {
            console.log(this.object.name);
            $scope.viewfields = _.find(this.object.views, function(vobj){return vobj.name == $scope.viewname; console.log(vobj.name); });
        };


        $scope.create = function() {

            var object = new KaboodleObjects({
                name: this.newobject.name,
                type: this.data.selectedType
            });

            $scope.data.object = object.$save(function(response) {
                return response;
                }).then(function(response){
                    $scope.object = response;
                    $scope.data.objects.push($scope.object);
            });

            this.newobject.name = "";
        };

        $scope.removeObject = function(object) {
            var index = this.data.objects.indexOf(object);
            this.data.objects.splice(index, 1);
            object.$remove();
        };

        $scope.addField = function(addnewfield) {
            this.object._id = $routeParams.id
            this.object.fields.push(addnewfield);
            this.object.$update(function(response) {
                console.log('saved');
            });
            $scope.newfield = {};
            $scope.newfield.req = 'n';
            $scope.newfield.type = 'Text';
        };

        $scope.copySelectedObject = function(selectedItem) {
            this.object.fields = selectedItem.fields;
            this.object.views = selectedItem.views;
            this.object.$update(function(response) {
                console.log('saved');
            });
        };

        $scope.removeField = function(column) {
            this.object._id = $routeParams.id;
            var index = this.object.fields.indexOf(column);
            this.object.fields.splice(index, 1);

            this.object.$update(function(response) {
                console.log(response);
            });
        };

        $scope.removeViewField = function(viewcolumn, viewnumber) {
            console.log(viewnumber);
            this.object._id = $routeParams.id;
            var index = this.object.views[viewnumber].fields.indexOf(viewcolumn);
            this.object.views[viewnumber].fields.splice(index, 1);
            this.object.$update(function(response) {
                console.log(response);
            });
        };
    }])

    .controller('KaboodleTypesCtrl', ['$scope', 'KaboodleTypes',  function($scope, KaboodleTypes) {
        $scope.data = {};
        KaboodleTypes.query(function(response) {
            $scope.data.types = response;
        });
    }])

    .controller('ProjectsCtrl', ['$scope', 'KaboodleProjects', function($scope, KaboodleProjects) {
        $scope.data = {};

        KaboodleProjects.query(function(response) {
            $scope.data.projects = response;
        });
    }]);
