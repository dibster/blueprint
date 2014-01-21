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
         '$log',

        function($scope, KaboodleObjects, KaboodleTypes, KaboodleFieldTypes,  $routeParams, $location, $log) {

        $scope.data = {};
        $scope.newobject = {};
        $scope.object = {};
        $scope.newfield = {};
        $scope.data.selectedType="";
        $scope.newfield.required = "Optional";

//        $scope.focusInput="true";

        KaboodleObjects.query(function(response) {
            // remove templates from the list , should be back end code
            $scope.data.objects = response;
//            $scope.data.objects = _.where(response, {template : false});
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
                type: this.data.selectedType,
                template : false
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
            if (!(_.has(this.object, "fields")))
            {
                this.object.fields = [addnewfield];
            }
            else {
                this.object.fields.push(addnewfield);
            }


            this.object.$update(function(response) {
                console.log('saved');
            });
            $scope.newfield = {};
            $scope.newfield.req = 'n';
        };

        $scope.copySelectedObject = function(selectedItem) {
            this.object.fields = selectedItem.fields;
            $scope.objectId = $routeParams.id;
            console.log( 'in copy ' + $scope.objectId);
            this.object.views = selectedItem.views;
            this.object.$update(function(response) {
                console.log('saved');
            });
        };


        $scope.removeField = function(column) {
            this.object._id = $routeParams.id;
            var index = this.object.fields.indexOf(column);
            this.object.fields.splice(index, 1);

           // remove fields on views, might be a quicker way with underscore but couldn't find one, stackoverflow suggested just using splice

            for(var i=0; i< this.object.views.length; i++)
            {
                var fieldExists = false;
                // get the array length
                var arrayLength = this.object.views[i].fields.length;
                // does the field exist
                for (var index = 0; index < arrayLength; index++) {
                    if (this.object.views[i].fields[index].name === column.name)
                    {
                        this.object.views[i].fields.splice(index, 1);
                        break;
                    }
                }
            }

            this.object.$update(function(response) {
                console.log(response);
            });


        };


    }])
    .controller('KaboodleAdminViewCtrl',
         ['$scope',
           'KaboodleObjects',
           '$routeParams',
           '$location',

         function($scope, KaboodleObjects, $routeParams, $location) {

             console.log ('admin view controller');
             $scope.data = {};
             $scope.viewfields = {};
             $scope.createview = [];
             $scope.editview = [];
             $scope.showview = [];
             $scope.dashboardview = [];
             $scope.listview = [];

             $scope.objectId = "";


             $scope.viewPage = function() {
                 KaboodleObjects.get({id : $routeParams.id},function(object) {
                     $scope.object = object;
                     $scope.createview = $scope.object.views[0].fields;
                     $scope.editview = $scope.object.views[1].fields;
                     $scope.showview = $scope.object.views[2].fields;
                     $scope.dashboardview = $scope.object.views[3].fields;
                     $scope.listview = $scope.object.views[4].fields;
             });

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
                          objectUpdated = true;
                     }
                 }
                 //todo fix the views lists so that they can be updated properly

                 if (objectUpdated) {
                     this.object.$update(function(response) {
                         console.log(response);
                         $scope.viewPage();
                         $scope.object = response;
                         $scope.object._id = $routeParams.id;
                     });
                 }
             };


             $scope.removeViewField = function(viewcolumnname, viewnumber) {
                 this.object._id = $routeParams.id;
                 var index = this.object.views[viewnumber].fields.indexOf(viewcolumnname);
                 this.object.views[viewnumber].fields.splice(index, 1);
                 this.object.$update(function(response) {
                     console.log(response);
                     $scope.viewPage();
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
                     });
                 }
             };

         };
    }])
    .controller('KaboodleTypesCtrl', ['$scope', 'KaboodleTypes',  function($scope, KaboodleTypes) {
        $scope.data = {};
        KaboodleTypes.query(function(response) {
            $scope.data.types = response;
        });
    }])

    .controller('ProjectDashboardCtrl',
        ['$scope',
         'KaboodleProjectInstances',
         '$routeParams',
         '$location' ,

         function($scope, KaboodleProjectInstances, $routeParams, $location) {

            // bad , but its just a demo .....
            filepicker.setKey('A329Dm8m7T5ies2SEBTtjz');

            $scope.newsItems = [];
            $scope.tasks = [];
            $scope.project = {};
            $scope.currentProjectId = $routeParams.id;
            $scope.dateOptions = {
                 'year-format': "'yy'",
                 'starting-day': 1
            };
            $scope.findOne = function() {
            KaboodleProjectInstances.get({id : $routeParams.id},function(project) {
                $scope.project = project;

            });

            $scope.AddNewsItem = function(newsItem) {

                console.log(newsItem);
                if (!(_.has($scope.project, "news")))
                {
                    console.log('creating new news object on the project');
                    $scope.project.news = $scope.newsItems;tend
                }
                var user = 1;
                var datetimeNow = new Date();
                var userTimeStamp = {'u' : user, 'cd' : datetimeNow};
                // add timestamp to task
                var newNewsItem = _.assign(newsItem, userTimeStamp);
                console.log(newNewsItem);
                $scope.project.news.push(newNewsItem);
                this.project._id = $routeParams.id;
                this.project.$update(function(response) {
                    console.log('saved');
                });
            }

            $scope.AddTask = function(task) {

                if (!(_.has($scope.project, "tasks")))
                {
                    console.log('creating new tasks object on the project');
                    $scope.project.tasks = $scope.tasks;
                }

                // append user and date to the task as a service (and maybe a slug)
                var user = 1;
                var datetimeNow = new Date();
                var taststatus = 'Open';
                var baseTaskData = {'u' : user, 'cd' : datetimeNow, 'taskStatus': taststatus};
                // add timestamp to task
                var newTask = _.assign(task, baseTaskData);
                console.log(newTask);
                $scope.project.tasks.push(newTask);
                this.project._id = $routeParams.id;
                this.project.$update(function(response) {
                    console.log('saved');
                });
            }

            $scope.AddAssets = function(uploadedassets) {
                if (!(_.has($scope.project, "assets")))
                {
                    console.log('creating new Assets object on the project');
                    $scope.project.assets = uploadedassets;
                }
                else
                {
                    $scope.project.assets = _.union($scope.project.assets,uploadedassets);
                }

                this.project._id = $routeParams.id;
                this.project.$update(function(response) {
                    console.log('saved');
                });
            }

        };

    }])
    .controller('ProjectCopyCtrl', ['$scope', '$routeParams', '$location','KaboodleProjects','PrepareRecord', 'KaboodleProjectInstances', function($scope,$routeParams, $location, KaboodleProjects,PrepareRecord, KaboodleProjectInstances) {
        $scope.selectedProject = {};
        $scope.projectIinstances = {};

        $scope.skipWeekends = true;

        $scope.alerts = [
            { type: 'success', msg: 'Select a suitable project to copy, then choose the tasks, assets, and team you need and click Copy' },
        ];

        KaboodleProjectInstances.query(function(response) {
            $scope.projectInstances = response;
        });

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.addAlert = function() {
            $scope.alerts.push({msg: "Select Tasks, Assets and Team from the area on the left"});
        };

        $scope.getProjectSummary = function(selectedProject) {
            KaboodleProjectInstances.get({id : selectedProject._id},function(project) {
                $scope.selectedProject = project;
                // add selected property to object, makes it easier to use when copying
                _.each($scope.selectedProject.tasks,function(task) {
                    task.selected=true;
                })
                _.each($scope.selectedProject.assets,function(asset) {
                    asset.selected=false;
                })
                $scope.alerts.push({msg: "Select Tasks, Assets and Team from the area on the left"});

            });
        }

        $scope.copyContent = function() {
            var newtasks = _.where($scope.selectedProject.tasks, {selected : true});
            var newassets = _.where($scope.selectedProject.assets, {selected : true});
            console.log(newtasks);
            console.log(newassets);

            console.log($routeParams.id);
            // should be API function but will use existing rest for now

            // get current project

            KaboodleProjectInstances.get({id : $routeParams.id},function(project) {
                var targetProject = project;
                // add selected property to object, makes it easier to use when copying
                if (newtasks.length > 0) {
                    targetProject.tasks = newtasks;
                }
                if (newassets.length > 0) {
                    targetProject.assets = newassets;
                }

                targetProject.$update(function(response) {
                    console.log('copied tasks and assets to project');
                    $location.path( "/projects/"+ $routeParams.id + "/edit");

                });


            });


        }

    }])

    .controller('MyProjectDashboardCtrl', ['$scope', '$routeParams', '$location', '$timeout','KaboodleProjects', 'MyKaboodleProjectInstances', function($scope,$routeParams, $location, $timeout,  KaboodleProjects, MyKaboodleProjectInstances) {

        $scope.projectIinstances = {};
        $scope.MyNews = [];
        $scope.MyTasks = [];
        $scope.MyAssets = [];
        $scope.ShowHideButton = true;
        $scope.Refresh = false;

        $scope.refreshInterval = 60;

        $scope.skipWeekends = true;

        $scope.alerts = [
            { type: 'success', msg: '4 new Assets, 6 new tasks, and 14 news Items since your visit' },
        ];


        $scope.fetchMyProjects = function() {
            MyKaboodleProjectInstances.query({id : $routeParams.id},function(projects) {
                $scope.projectInstances = projects;
                // uunderscore is pretty cool, may be stupid what i am doing but, get all the arrays from all returned , then flatten them into a
                // single array,then remove any undefined items
                $scope.MyNews = _.compact(_.flatten(_.pluck(projects,'news')));
                $scope.MyTasks = _.compact(_.flatten(_.pluck(projects,'tasks')));
                $scope.MyAssets = _.compact(_.flatten(_.pluck(projects,'assets')));
                if ($scope.Refresh) {
                $timeout(function() { $scope.fetchMyProjects(); }, $scope.refreshInterval * 1000);
                }
         });
        };

        $scope.hideProjects = function() {
            $scope.ShowHideButton = false;
            console.log($scope.showHideButton);
        };

        $scope.showProjects = function() {
            $scope.ShowHideButton = true;
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

    }])

    .controller('ProjectsCtrl', ['$scope', '$modal','$log', 'KaboodleProjects','PrepareRecord', 'KaboodleProjectInstances','KaboodleTags',  function($scope, $modal, $log, KaboodleProjects,PrepareRecord, KaboodleProjectInstances, KaboodleTags) {
        $scope.data = {};
        $scope.formItems = {};
        $scope.selectedType = "";
        $scope.projectIinstances = {};
        $scope.tagList = {};

        KaboodleProjectInstances.query(function(response) {
            $scope.projectInstances = response;
        });

        KaboodleProjects.query(function(response) {
            $scope.projectTypes = response;
        });


        $scope.saveFormDetails = function(formData) {
            $log.info('in update');
            $log.info($scope.selectedType);
            var myRecord = PrepareRecord.getRecord(formData,$scope.selectedType);
            var kaboodleproject = new KaboodleProjectInstances(myRecord);

            $scope.data.project = kaboodleproject.$save(function(response) {
                $scope.projectInstances.push(response);
    //                return response;
            });
        };

        $scope.openCreateProjectModal = function (selectedObject) {
                // get tags
            $scope.selectedType = selectedObject.name;
            var modalInstance = $modal.open({
                templateUrl: 'partials/modalProjectCreate.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    items: function () {
                        $log.info(selectedObject);
                        return selectedObject.views[0].fields;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.formData = selectedItem;
                $scope.saveFormDetails($scope.formData);

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        var ModalInstanceCtrl = function($scope,$modalInstance, items) {

            $scope.items = items;
            $log.info('in instance controller');
            $scope.bannertypes = ['40K Banner', 'Static Banner', '100K Banner'];

            // this would get values from backend,  but not implemented yet

            $scope.getTagValues = function(fieldname) {
                    //
                    $log.info('tag requested');
                    $log.info(fieldname);

                    KaboodleTags.get({id : fieldname},function(tag) {
                        //$log.info('tag values : ' + tag.values[0].value );
                        return tag.values;
                    });
                }

            $scope.ok = function () {
                $modalInstance.close($scope.items);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            }


    }])

;
