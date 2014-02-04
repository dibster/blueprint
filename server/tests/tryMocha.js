/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');

var api = 'http://localhost:3000';

console.log ('before Mocha test');


describe('Project Tests', function() {

    before(function(done) {
        console.log('before ...');

        var newObject = {
            "Title" : "FIFA 10",
            "Description": "FIFA 10 Project...",
            "Type" : "Campaign",
            "Status" : "Open"};

        request(api)
            .get('/api/resetDB')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.contain('Database Reset');
                request(api)
                    .post('/api/kaboodleprojects')
                    .send(newObject)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) {
                            throw err;
                        }
                    });
            });
        done();
    });

    describe('test inside test', function() {
        it('should find a record and return 200', function(done) {
            console.log('1 test inside test with done');
            done();
        });
        it('should find a record and return 200', function(done) {
            console.log('2 test inside test with done');
            done();
        });
        it('should find a record and return 200', function(done) {
            console.log('3 test inside test with done');
            done();
        });
        it('should find a record and return 200', function(done) {
            console.log('4 test inside test with done');
            done();
        });
        it('should find a record and return 200', function(done) {
            console.log('5 test inside test with done');
            done();
        });
        it('should find a record and return 200', function(done) {
            console.log('6 test inside test with done');
            done();
        });
        it('should find a record and return 200', function(done) {
            console.log('7 test inside test with done');
            done();
        });
        it('should find a record and return 200', function(done) {
            console.log('8 test inside test with done');
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

