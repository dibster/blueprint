'use strict';

/* Services */

angular.module('myApp.services', ['ngResource'])
    .factory('KaboodleObjects', function($resource){
        return $resource('http://localhost:3000/api/objects', {})
    })
    .factory('KaboodleProjects', function($resource){
        return $resource('http://localhost:3000/api/projects', {})
    })
    .value('version', '0.1');
