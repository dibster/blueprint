'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl1', ['$scope', 'KaboodleObjects', function($scope, KaboodleObjects) {
        // Instantiate an object to store your scope data in (Best Practices)
        $scope.data = {};

        KaboodleObjects.query(function(response) {
            // Assign the response INSIDE the callback
            $scope.data.objects = response;
            console.log(response);

        });
    }])

    .controller('MyCtrl2', [function() {
    }]);
