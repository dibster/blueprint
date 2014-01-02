'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ObjectsCtrl',
        ['$scope',
         'KaboodleObjects',
         'KaboodleTypes',
         'KaboodleFieldTypes',
         '$routeParams',
         '$location',

        function($scope, KaboodleObjects, KaboodleTypes, KaboodleFieldTypes,  $routeParams, $location) {

        $scope.data = {};
        $scope.newobject = {};
        $scope.object = {};
        $scope.newfield = {};
        $scope.data.selectedType="";
        $scope.newfield.required = "Optional";
        $scope.viewfields = {};
        $scope.createview = [];
        $scope.editview = [];
        $scope.showview = [];
        $scope.dashboardview = [];
        $scope.listview = [];

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
                $scope.createview = $scope.object.views[0].fields;
//                $scope.createview = _.pluck($scope.object.views[0].fields, 'name');
                $scope.editview = _.pluck($scope.object.views[1].fields, 'name');
                $scope.showview = _.pluck($scope.object.views[2].fields, 'name');
                $scope.dashboardview = _.pluck($scope.object.views[3].fields, 'name');
                $scope.listview = _.pluck($scope.object.views[4].fields, 'name');

            });
        };

        $scope.viewProcessing = function(viewname) {
            console.log(this.object.name);
            $scope.viewfields = _.find(this.object.views, function(vobj){return vobj.name == $scope.viewname; console.log(vobj.name); });
        };

        $scope.updateCreateView = function() {
            console.log('in create view');
//            console.log($scope.createview);
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


        $scope.addFieldToViews = function(selectedItem) {

            console.log($routeParams.id);
            this.object._id = $routeParams.id;
            var selectedItemName = selectedItem.name;
            var objectUpdated = false;

            console.log('in add field');
            console.log(selectedItem);
            console.log(this.object);


            // iterate through all views

            for(var i=0;i<5;i++)
            {
                var fieldExists = false;
                // get the array length
                var arrayLength = this.object.views[i].fields.length;
                // does the field exist
                for (var index = 0; index < arrayLength; ++index) {
                    if (this.object.views[i].fields[index].name == selectedItemName)
                    {
                        fieldExists = true;
                        break;
                    }
                }
                if (!fieldExists) {
                    console.log('Adding Field' + selectedItem);
                    this.object.views[i].fields.push(selectedItem);

                    // why us this not updated

                    objectUpdated = true;
                }
            }
            //todo fix the views lists so that they can be updated properly

            if (objectUpdated) {
                this.object.$update(function(response) {
                    console.log(response);
                    $scope.object = response;
                    $scope.object._id = $routeParams.id;
                });
            }
        };

        $scope.removeField = function(column) {
            this.object._id = $routeParams.id;
            var index = this.object.fields.indexOf(column);
            this.object.fields.splice(index, 1);

            this.object.$update(function(response) {
                console.log(response);
            });

        };

        $scope.sortingLog = [];

        $scope.sortableOptionsCreate = {
            // called after a node is dropped
            stop: function(e, ui) {
                    var logEntry = {
                    ID: $scope.sortingLog.length + 1,
                    Text: 'Moved element: ' + ui.item.scope().item.text
                };
                $scope.sortingLog.push(logEntry);
                $scope.object.views[0].fields = $scope.createview;
                $scope.object.$update(function(response) {
//                    console.log(response);
                });
            }
        };


        $scope.removeViewField = function(viewcolumnname, viewnumber) {
            console.log(viewnumber);
            console.log(viewcolumnname);

            this.object._id = $routeParams.id;
            var index = this.object.views[viewnumber].fields.indexOf(viewcolumnname);
            this.object.views[viewnumber].fields.splice(index, 1);
            this.object.$update(function(response) {
                console.log(response);
            });
        };
    }])


    .controller('KaboodleAdminViewCtrl',
         ['$scope',
           'KaboodleObjects',
           '$routeParams',
           'location',

         function($scope, KaboodleObjects, $routeParams, $location) {
         $scope.data = {};

    }])

    .controller('KaboodleTypesCtrl', ['$scope', 'KaboodleTypes',  function($scope, KaboodleTypes) {
        $scope.data = {};
        KaboodleTypes.query(function(response) {
            $scope.data.types = response;
        });
    }])

    .controller('ProjectsCtrl', ['$scope', 'KaboodleProjects','PrepareRecord', 'KaboodleProjectInstances', function($scope, KaboodleProjects,PrepareRecord, KaboodleProjectInstances) {
        $scope.data = {};
        $scope.formItems = {};
        $scope.selectedType = "";
        $scope.projectIinstances = {};

        KaboodleProjects.query(function(response) {
            $scope.data.projects = response;
        });

        $scope.projectFieldsForCreate = function(selectedObject) {
            $scope.selectedType = selectedObject.name;
            console.log($scope.selectedType);
            $scope.formItems = selectedObject.fields;
            KaboodleProjectInstances.query(function(response) {
                $scope.projectInstances = response;
            });
        };

        $scope.saveFormDetails = function(formData) {
            console.log($scope.selectedType);
            var myRecord = PrepareRecord.getRecord(formData,$scope.selectedType);
            console.log(myRecord);
            var kaboodleproject = new KaboodleProjectInstances(myRecord);
            $scope.projectInstances.push(myRecord);
            $scope.data.project = kaboodleproject.$save(function(response) {
                return response;
            });
        };

    }]);
