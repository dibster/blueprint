/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');

// Empty the database (seems to do it before each run!!)

var refreshMongoDatabase = require('../utilities/refreshBlueprintDB');


describe('Routing', function() {
    var url = 'http://localhost:3000';

//    before(function(done) {
//        done();
//    });

    describe('Count the number of base objects', function() {
        it('should return 5 objects', function(done) {

            // count objects should have one more (6)

            request(url)
                .get('/objects')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log('response got back from server' + res.body.length);
                    res.body[0].should.have.property('objecttype');
                    res.body.length.should.eql(5);
                    done();
                });
        });
    });


});
