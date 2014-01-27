'use strict';

/* Services */

//todo add real project route call other adminproject admin milestone etc

angular.module('myApp.services', ['ngResource'])
    .factory('KaboodleObjects', function($resource){
        return $resource('http://localhost:3000/api/objects/:id', {id:'@_id'}, {update:{method: 'PUT'}})
    })
    .factory('KaboodleProjects', function($resource){
        return $resource('http://localhost:3000/api/projects', {})
    })
    .factory('KaboodleListDefinitions', function($resource){
        return $resource('http://localhost:3000/api/lists', {})
    })
    .factory('KaboodleProjectInstances', function($resource){
        return $resource('http://localhost:3000/api/kaboodleprojects/:id', {id:'@_id'}, {update:{method: 'PUT'}})
    })
    .factory('KaboodleLists', function($resource){
        return $resource('http://localhost:3000/api/kaboodlelists/:id', {id:'@_id'}, {update:{method: 'PUT'}})
    })
    .factory('MyKaboodleProjectInstances', function($resource){
        return $resource('http://localhost:3000/api/kaboodleprojectsforuser/:id', {id:'@_id'}, {})
    })
    .factory('KaboodleTags', function($resource){
        return $resource('http://localhost:3000/api/kaboodletags/:id', {id:'@_id'}, {})
    })
    .factory('KaboodleTypes', function($resource){
        return $resource('http://localhost:3000/api/kaboodletypes', {})
    })
    .factory('KaboodleFieldTypes', function($resource){
        return $resource('http://localhost:3000/api/fieldtypes', {})
    })
    .service('PrepareRecord', function() {
        this.getRecord = function(formData, type) {
            var jsonrecord = {"Type" : type};
            formData.forEach(function(field) {
                if (field.content != null) {
                    var fieldname = field.name;
                    jsonrecord[fieldname] = field.content;
                };
            });
            return jsonrecord;
        };
    })
    .value('version', '0.1');

