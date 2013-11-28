/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');



describe('Routing', function() {

    var url = 'http://localhost:3000';
    var recordId;

    describe('Add a new Project Object', function() {
        it('should get a record', function(done) {

            request(url)
                .get('/projects')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('objecttype');

                    recordId = res.body[0]._id;
                    console.log(recordId);
                    done();
                });
        });
    });


    describe('Update the Project Record', function() {
        it('should update and return a project record ', function(done) {

            request(url)
                .put('/objects/' + recordId)
                .send({description : 'Updated'})
                .expect(200)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    console.log(res.body.description);
                    done();
                });
        });
    });


});
