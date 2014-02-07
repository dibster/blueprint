/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');

var api = 'http://localhost:3000';

// reset the database here

var recordIdForRead = "";
request(api)
    .get('/api/resetDB')
    .expect(200)
    .end(function(err, res) {
        if (err) {
            throw err;
        }
        res.text.should.contain('Database Reset');
    });

describe('Project Tests', function() {

    before(function(done) {

        var newFaceBookProject = {
            "Title" : "FaceBook Project",
            "Description": "Facebook Channel",
            "Channel Type " : "Facebook",
            "Type" : "Social Media",
            "Status" : "Open",
            "tasks" : [
                {
                    "name" : "Receive Brief",
                    "date" : "2014-01-16T00:00:00.000Z",
                    "who" : "Test",
                    "u" : 1,
                    "cd" : "2014-01-16T08:30:07.441Z",
                    "taskStatus" : "Open"
                },
                {
                    "name" : "Ingest Content",
                    "date" : "2014-01-16T00:00:00.000Z",
                    "who" : "Test",
                    "u" : 1,
                    "cd" : "2014-01-16T08:30:26.560Z",
                    "taskStatus" : "Open"
                },
                {
                    "name" : "Create Quote",
                    "date" : "2014-01-17T00:00:00.000Z",
                    "who" : "Test",
                    "u" : 1,
                    "cd" : "2014-01-16T08:30:51.238Z",
                    "taskStatus" : "Open"
                },
                {
                    "name" : "Produce Project Plan",
                    "date" : "2014-01-17T00:00:00.000Z",
                    "who" : "Test",
                    "u" : 1,
                    "cd" : "2014-01-16T08:31:12.820Z",
                    "taskStatus" : "Open"
                }
            ]

        };


        request(api)
            .post('/api/kaboodleprojects')
            .send(newFaceBookProject)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.body._id.should.have.length(24);
                recordIdForRead = res.body._id;
                done();
            });
    });

    describe('Testing FaceBook Project', function() {

        it('should find the record with id ' + recordIdForRead, function(done) {
            request(api)
                .get('/api/kaboodleprojects/' + recordIdForRead)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.have.length(24);
                    done();
                });
        });

        it('should update the record', function(done) {
            var FaceBookProjectUpdate = {
                "Title" : "FaceBook Project",
                "Description": "Facebook Channel Updated",
                "Channel Type " : "Facebook",
                "Type" : "Social Media",
                "Status" : "Open",
                "tasks" : [
                    {
                        "name" : "Receive Brief",
                        "date" : "2014-01-16T00:00:00.000Z",
                        "who" : "Test",
                        "u" : 1,
                        "cd" : "2014-01-16T08:30:07.441Z",
                        "taskStatus" : "Open"
                    },
                    {
                        "name" : "Ingest Content",
                        "date" : "2014-01-16T00:00:00.000Z",
                        "who" : "Test",
                        "u" : 1,
                        "cd" : "2014-01-16T08:30:26.560Z",
                        "taskStatus" : "Open"
                    },
                    {
                        "name" : "Create Quote",
                        "date" : "2014-01-17T00:00:00.000Z",
                        "who" : "Test",
                        "u" : 1,
                        "cd" : "2014-01-16T08:30:51.238Z",
                        "taskStatus" : "Open"
                    },
                    {
                        "name" : "Produce Project Plan",
                        "date" : "2014-01-17T00:00:00.000Z",
                        "who" : "Test",
                        "u" : 1,
                        "cd" : "2014-01-16T08:31:12.820Z",
                        "taskStatus" : "Open"
                    }
                ],
                "Invoices" : [
                    {
                        "Title" : "Pay This",
                        "date" : "2014-01-16T00:00:00.000Z",
                        "who" : "Test",
                        "u" : 1,
                        "cd" : "2014-01-16T08:30:07.441Z",
                        "Status" : "Open"
                    },
                    {
                        "Title" : "Pay This",
                        "date" : "2014-01-16T00:00:00.000Z",
                        "who" : "Test",
                        "u" : 1,
                        "cd" : "2014-01-16T08:30:07.441Z",
                        "Status" : "Open"
                    },
                    {
                        "Title" : "Pay This",
                        "date" : "2014-01-16T00:00:00.000Z",
                        "who" : "Test",
                        "u" : 1,
                        "cd" : "2014-01-16T08:30:07.441Z",
                        "Status" : "Open"
                    }
                ]

            };
            request(api)
                .put('/api/kaboodleprojects/' + recordIdForRead)
                .send(FaceBookProjectUpdate)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.Description.should.be.exactly('Facebook Channel Updated');
                    done();
            });
        });

        it('should return a project for userid  Test', function(done) {
            request(api)
                .get('/api/kaboodleprojectsforuser/Test')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('Title');
                    res.body[0].tasks.length.should.eql(4);
                    done();
                });

        });

        it('should not return anything for user IsNotDefined', function(done) {
            request(api)
                .get('/api/kaboodleprojectsforuser/IsNotDefined')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.not.have.property('Title');
                    done();
                });

        });

        it('Show the invoices for an Updated Record ' + recordIdForRead, function(done) {
            request(api)
                .get('/api/kaboodleprojects/' + recordIdForRead)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('Invoices');
                    done();
                });
        });

        it('should update a task on a project', function(done) {

            var taskCreateDate =  "2014-01-16T08:30:07.441Z";

            var updatedTask = {
                "name" : "Receive Brief Updated and Closed",
                "date" : "2014-01-16T00:00:00.000Z",
                "who" : "Dave",
                "u" : 1,
                "cd" : "2014-01-16T08:30:07.441Z",
                "taskStatus" : "Closed"
            };

            request(api)
                .put('/api/kaboodleprojects/' + recordIdForRead + "/tasks/" + taskCreateDate)
                .send(updatedTask)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.text.should.contain('Task Updated');
                    done();
                });
        });


        it('should do nothing', function(done) {
            console.log('Done');
            done();
        });
    });
});

//describe('second describe', function() {
//    console.log('second describe');
//
//    before(function(done) {
//        console.log('second before has done');
//        done();
//    });
//
//    describe('test inside test', function() {
//        it('should find a record and return 200', function(done) {
//            console.log('secoind test inside second test with done');
//            done();
//        });
//    });
//
//});
//

