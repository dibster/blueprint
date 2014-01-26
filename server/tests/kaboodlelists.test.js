/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';
var fetchrecordId;



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

describe('Add a new List record', function() {
    it('should add it and return 200', function() {

        var newListObject = {
            "ListName" : "Games",
            "Title" : "FIFA 10",
            "Description": "FIFA 10",
            "Type" : "Sport",
            "Status" : "Active"};

        request(url)
            .post('/api/kaboodlelists')
            .send(newListObject)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
            });

    });

});

describe('Add some records of different type', function() {
    it('should add them and return 200', function() {

        var newObject = {
            "ListName" : "Titles And Something",
            "Title" : "Sports",
            "Description": "EA Sports"
        };

        request(url)
            .post('/api/kaboodlelists')
            .send(newObject)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
            });

        var newObject = {
            "ListName" : "Titles And Something",
            "Title" : "Games",
            "Description": "EA Games"
        };

        request(url)
            .post('/api/kaboodlelists')
            .send(newObject)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
            });

    });

});

describe('get all records of type Titles', function() {
    it('should return record', function() {
        request(url)
            .get('/api/kaboodlelistsbyname/' + "Titles And Something")
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                console.log(res);
                res.body[0].should.have.property('ListName');
                res.body[1].should.have.property('ListName');
                fetchrecordId = res.body[0]._id;
            });

    });

});


describe('Update a record', function() {
    it('should update it and return 200', function() {

        var newObject = {
            "ListName" : "Titles And Something",
            "name" : "Sport",
            "description": "Sports Updated by tests"
            };

        request(url)
            .put('/api/kaboodlelists/' + fetchrecordId)
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
            .del('/api/kaboodlelists/' + fetchrecordId)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
            });
        request(url)
            .get('/api/kaboodlelistsbyname/' + "Titles And Something")
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.body[0].should.have.property('ListName');
                res.body.length.should.equal(1);
            });
    });
});


//    describe('Count the number of projects after delete', function() {
//        it('should return 1 object', function() {
//            // count objects should have one more (6)
//            request(url)
//                .get('/api/kaboodleprojects')
//                .expect(200)
//                .end(function(err, res) {
//                    if (err) {
//                        throw err;
//                    }
//                    res.body[0].should.have.property('Title');
//                    res.body.length.should.eql(1);
//                });
//        });
//    });
//
//    describe('Get the Projects that a person has tasks on', function() {
//        it('should return 1 object with 4 tasks on it', function() {
//            // count objects should have one more (6)
//            request(url)
//                .get('/api/kaboodleprojectsforuser/Test')
//                .expect(200)
//                .end(function(err, res) {
//                    if (err) {
//                        throw err;
//                    }
//                    res.body[0].should.have.property('Title');
//                    res.body[0].tasks.length.should.eql(4);
//                });
//        });
//    });
//
//
//});
