'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
    .factory('KaboodleObjects', function($resource){
        return $resource('http://localhost:3000/api/objects', {})
    })
    .value('version', '0.1');
