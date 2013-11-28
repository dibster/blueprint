/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');

// Empty the database



describe('Routing', function() {
    var url = 'http://localhost:3000';

//    before(function(done) {
//        done();
//    });

    describe('Retrieve Project Objects', function() {
        it('Should receive 2 objects of type Project', function(done) {

            // objects/projects

            request(url)
                .get('/objects/project')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log('response got back from server');
                    res.body[0].should.have.property('objecttype');
                    res.body.length.should.eql(2);
                    done();
                });
        });
    });


});
