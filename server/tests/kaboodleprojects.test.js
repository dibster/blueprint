/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');

var api = 'http://localhost:3000';
var fetchrecordId;

describe('Empty DB', function() {




    describe('Find the record ', function(done) {
        it('should find a record and return 200', function() {
            console.log('find ....');
            request(api)
                .get('/api/kaboodleprojects')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    fetchrecordId = res.body[0]._id;
                    console.log( ' retrieved record if is : ' + fetchrecordId);
                    done();
                });
        });

    });

});


//describe('Add a record different type', function() {
//    it('should add it and return 200', function() {
//        console.log('3');
//
//        var newObject = {
//            "Title" : "FaceBook Project",
//            "Description": "Facebook Channel",
//            "Channel Type " : "Facebook",
//            "Type" : "Social Media",
//            "Status" : "Open",
//            "tasks" : [
//                {
//                    "name" : "Receive Brief",
//                    "date" : "2014-01-16T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:07.441Z",
//                    "taskStatus" : "Open"
//                },
//                {
//                    "name" : "Ingest Content",
//                    "date" : "2014-01-16T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:26.560Z",
//                    "taskStatus" : "Open"
//                },
//                {
//                    "name" : "Create Quote",
//                    "date" : "2014-01-17T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:51.238Z",
//                    "taskStatus" : "Open"
//                },
//                {
//                    "name" : "Produce Project Plan",
//                    "date" : "2014-01-17T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:31:12.820Z",
//                    "taskStatus" : "Open"
//                }
//            ]
//
//        };
//
//        request(api)
//            .post('/api/kaboodleprojects')
//            .send(newObject)
//            .expect(200)
//            .end(function(err, res) {
//                if (err) {
//                    throw err;
//                }
//            });
//    });
//
//});
//
//
//describe('Count the number of base objects', function() {
//    it('should return 2 objects', function() {
//        // count objects should have one more (6)
//        console.log('5');
//
//        request(api)
//            .get('/api/kaboodleprojects')
//            .expect(200)
//            .end(function(err, res) {
//                if (err) {
//                    throw err;
//                }
//                res.body[0].should.have.property('Title');
//                res.body.length.should.eql(2);
//            });
//    });
//});
//
//
//
//


//describe('find a record', function() {
//    it('should return record', function() {
//        console.log('find a record with id : ' + fetchrecordId);
//        console.log('6');
//        request(api)
//            .get('/api/kaboodleprojects/' + fetchrecordId)
//            .expect(200)
//            .end(function(err, res) {
//                if (err) {
//                    throw err;
//                }
//            });
//    });
//
//});
//

//
//describe('Update a record', function() {
//    it('should update it and return 200', function() {
//
//        console.log('7');
//
//        var newObject = {
//            "name" : "FIFA 10",
//            "description": "FIFA 10 Project Updated",
//            "type" : "Campaign",
//            "status" : "Open"};
//
//        request(api)
//            .put('/api/kaboodleprojects/' + fetchrecordId)
//            .send(newObject)
//            .expect(200)
//            .end(function(err, res) {
//                if (err) {
//                    throw err;
//                }
//            });
//
//    });
//});
////
//describe('Delete a record', function() {
//    it('should delete it and return 200', function() {
//        console.log('8');
//
//        request(api)
//            .del('/api/kaboodleprojects/' + fetchrecordId)
//            .expect(200)
//            .end(function(err, res) {
//                if (err) {
//                    throw err;
//                }
//            });
//
//    });
//});
//
//describe('Count the number of projects after delete', function() {
//    it('should return 1 object', function() {
//        // count objects should have one more (6)
//        console.log('9');
//        request(api)
//            .get('/api/kaboodleprojects')
//            .expect(200)
//            .end(function(err, res) {
//                if (err) {
//                    throw err;
//                }
//                res.body[0].should.have.property('Title');
//                res.body.length.should.eql(1);
//            });
//    });
//});
//
//describe('Get the Projects that a person has tasks on', function() {
//    it('should return 1 object with 4 tasks on it', function() {
//        console.log('10');
//        request(api)
//            .get('/api/kaboodleprojectsforuser/Test')
//            .expect(200)
//            .end(function(err, res) {
//                if (err) {
//                    throw err;
//                }
//                console.log(res.body);
//                res.body[0].should.have.property('Title');
//                res.body[0].tasks.length.should.eql(4);
//            });
//    });
//});
//
////describe('Add a New Record with attachable List Items', function() {
////    it('should return 1 object with 4 tasks on it', function() {
////        // count objects should have one more (6)
////        var newObject = {
////            "Title" : "New Project with Purchase Orders and Invoices",
////            "Description": "Facebook Channel",
////            "Channel Type " : "Facebook",
////            "Type" : "Social Media",
////            "Status" : "Open",
////            "Purchase Orders" : [
////                {
////                    "Title" : "Buy This",
////                    "date" : "2014-01-16T00:00:00.000Z",
////                    "who" : "Test",
////                    "u" : 1,
////                    "cd" : "2014-01-16T08:30:07.441Z",
////                    "Status" : "Open"
////                },
////                {
////                    "Title" : "Buy This",
//                    "date" : "2014-01-16T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:07.441Z",
//                    "Status" : "Open"
//                },
//                {
//                    "Title" : "Buy This",
//                    "date" : "2014-01-16T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:07.441Z",
//                    "Status" : "Open"
//                }
//            ],
//            "Invoices" : [
//                {
//                    "Title" : "Pay This",
//                    "date" : "2014-01-16T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:07.441Z",
//                    "Status" : "Open"
//                },
//                {
//                    "Title" : "Pay This",
//                    "date" : "2014-01-16T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:07.441Z",
//                    "Status" : "Open"
//                },
//                {
//                    "Title" : "Pay This",
//                    "date" : "2014-01-16T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:07.441Z",
//                    "Status" : "Open"
//                }
//            ]
//
//        };
//
//        request(api)
//            .post('/api/kaboodleprojects')
//            .send(newObject)
//            .expect(200)
//            .end(function(err, res) {
//                if (err) {
//                    throw err;
//                }
//            });
//    });
//});
//
//
//describe('Add a new Record for update', function() {
//    it('should update it return 200', function() {
//
//        var newObject = {
//            "Title" : "YouTube Campaign",
//            "Description": "YouTube Campaign",
//            "Channel Type " : "YouTube",
//            "Type" : "Social Media",
//            "Status" : "Open",
//            "tasks" : [
//                {
//                    "name" : "Receive Brief",
//                    "date" : "2014-01-16T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:07.441Z",
//                    "taskStatus" : "Open"
//                },
//                {
//                    "name" : "Ingest Content",
//                    "date" : "2014-01-16T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:26.560Z",
//                    "taskStatus" : "Open"
//                },
//                {
//                    "name" : "Create Quote",
//                    "date" : "2014-01-17T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:30:51.238Z",
//                    "taskStatus" : "Open"
//                },
//                {
//                    "name" : "Produce Project Plan",
//                    "date" : "2014-01-17T00:00:00.000Z",
//                    "who" : "Test",
//                    "u" : 1,
//                    "cd" : "2014-01-16T08:31:12.820Z",
//                    "taskStatus" : "Open"
//                }
//            ]
//
//        };
//
//        request(api)
//            .post('/api/kaboodleprojects')
//            .send(newObject)
//            .expect(200)
//            .end(function(err, res) {
//                if (err) {
//                    throw err;
//                }
//            });
//    });
//});
//
//
//describe('Update a task record', function() {
//    it('should update it and return 200', function() {
//
//
//        var taskCreateDate =  "2014-01-16T08:30:07.441Z";
//        var recordforupdate = {};
//        var updateRecordId = "";
//
//        before(function(done){
//            request(api)
//                .get('/api/kaboodleprojects')
//                .expect(200)
//                .end(function(err, res) {
//                    if (err) {
//                        throw err;
//                    }
//                    updaterecordId = res.body[1]._id;
//                    recordforupdate = res.body[1];
//                    done();
//                });
//
//        });
//
//        console.log(recordforupdate);
//
////            request(api)
////                .put('/api/kaboodleprojects/' + fetchrecordId + 'tasks' / + taskCreateDate);
////                .send(recordForUpdate)
////                .expect(200)
////                .end(function(err, res) {
////                    if (err) {
////                        throw err;
////                    }
////                });
////
//    });
//
//});
//
