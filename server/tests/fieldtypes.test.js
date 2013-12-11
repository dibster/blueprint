/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';

describe('API', function() {

//    before(function(){
//        console.log('reset data');
//        request(url)
//            .get('/api/resetDB')
//            .expect(200);
//    });

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

    describe('Get Kaboodle Field Types', function() {
        it('should respond with array of field types and return 200', function() {

            request(url)
                .get('/api/fieldtypes')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body[0].should.have.property('name');
                    res.body[5].should.have.property('name');
                });

        });
    });

});
