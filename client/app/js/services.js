'use strict';

/* Services */

angular.module('myApp.services', ['ngResource'])
    .factory('KaboodleObjects', function($resource){
        return $resource('http://localhost:3000/api/objects/:id', {})
    })
    .factory('KaboodleProjects', function($resource){
        return $resource('http://localhost:3000/api/projects', {})
    })
    .factory('KaboodleTypes', function($resource){
        return $resource('http://localhost:3000/api/kaboodletypes', {})
    })
    .value('version', '0.1');
