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

describe('Add a record', function() {
    it('should add it and return 200', function() {

        var newObject = {
            "Title" : "FIFA 10",
            "Description": "FIFA 10 Project...",
            "Type" : "Campaign",
            "Status" : "Open"};

        request(url)
            .post('/api/kaboodleprojects')
            .send(newObject)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
            });

    });

});

describe('Add a record different type', function() {
    it('should add it and return 200', function() {

        var newObject = {
            "Title" : "FaceBook Project",
            "Description": "Facebook Channel",
            "Channel Type " : "Facebook",
            "Type" : "Social Media",
            "Status" : "Open"};

        request(url)
            .post('/api/kaboodleprojects')
            .send(newObject)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
            });

    });

});

describe('API', function() {
    // get a record ID for theID based tests
    before(function(done){
        request(url)
            .get('/api/kaboodleprojects')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                fetchrecordId = res.body[0]._id;
                done();
            });
    });


//
//
    describe('Count the number of base objects', function() {
        it('should return 2 objects', function() {
            // count objects should have one more (6)
            request(url)
                .get('/api/kaboodleprojects')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('Title');
                    res.body.length.should.eql(2);
                });
        });
    });






    describe('find a record', function() {
        it('should return record', function() {
            request(url)
                .get('/api/kaboodleprojects/' + fetchrecordId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                });
        });

    });


//
    describe('Update a record', function() {
        it('should update it and return 200', function() {

            var newObject = {
                "name" : "FIFA 10",
                "description": "FIFA 10 Project Updated",
                "type" : "Campaign",
                "status" : "Open"};

            request(url)
                .put('/api/kaboodleprojects/' + fetchrecordId)
                .send(newObject)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                });

        });
    });
//
    describe('Delete a record', function() {
        it('should delete it and return 200', function() {

            request(url)
                .del('/api/kaboodleprojects/' + fetchrecordId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                });

        });
    });

    describe('Count the number of projects after delete', function() {
        it('should return 1 object', function() {
            // count objects should have one more (6)
            request(url)
                .get('/api/kaboodleprojects')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('Title');
                    res.body.length.should.eql(1);
                });
        });
    });


});
