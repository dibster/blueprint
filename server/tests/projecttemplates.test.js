/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';
var fetchrecordId;
var updaterecordId;
var deleterecordId;

describe('Empty DB', function() {
    it('should reset data and return string Database Reset ', function() {

        request(url)
            .get('/api/resetDB')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.contain('Database Reset');
            });

    });
});


describe('API', function() {
    // get a record ID for theID based tests
    before(function(done){
        request(url)
            .get('/api/objects')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                fetchrecordId = res.body[0]._id;
                updaterecordId = res.body[1]._id;
                deleterecordId = res.body[5]._id;
                done();
            });
    });


    describe('Count the number of base objects', function() {
        it('should return 6 objects', function() {
            // count objects should have one more (6)
            request(url)
                .get('/api/objects')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('type');
                    res.body.length.should.eql(6);
                });
        });
    });



    describe('find a record', function() {
        it('should return record', function() {
            request(url)
                .get('/api/objects/' + fetchrecordId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                });
        });

    });

    describe('Add a record', function() {
        it('should add it and return 200', function() {

            var newObject = {
                "name" : "Campaign",
                "description": "New Campaign...",
                "type" : "project",
                "template" : "false"};

            request(url)
                .post('/api/objects')
                .send(newObject)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                });

        });
    });

    describe('Update a record', function() {
        it('should update it and return 200', function() {

            var newObject = {
                "name" : "Milestone Updated",
                "description": "Default Milestone Object Updated ...",
                "type" : "milestone",
                "template" : "true"};

            request(url)
                .put('/api/objects/' + updaterecordId)
                .send(newObject)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                });

        });
    });

    describe('Delete a record', function() {
        it('should delete it and return 200', function() {

            request(url)
                .del('/api/objects/' + deleterecordId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                });

        });
    });

    describe('Get Fields for project', function() {
        it('should respond with array of fields and return 200', function() {

            request(url)
                .get('/api/objects/' + fetchrecordId + '/fields')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // count fields
                    res.body.fields[0].should.have.property('type');
                });

        });
    });

    describe('Get Views for project', function() {
        it('should respond with array of views and return 200', function() {

            request(url)
                .get('/api/objects/' + fetchrecordId + '/views')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // count fields
                    res.body.views[0].should.have.property('name');
                    res.body.views[1].should.have.property('name');
                });

        });
    });

//    describe('Get fields for the Create view on a project', function() {
//        it('should respond with array of fields and return 200', function() {
//
//            var projectviewname = 'Create';
//            request(url)
//                .get('/api/objects/' + fetchrecordId + '/views/' + projectviewname + '/fields')
//                .expect(200)
//                .end(function(err, res) {
//                    if (err) {
//                        throw err;
//                    }
//                    // count fields
//                    res.body.fields[0].should.have.property('name');
//                });
//
//        });
//    });


});
