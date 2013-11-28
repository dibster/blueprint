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
        it('should add a new project object called Campaign', function(done) {

            var newProjectObject =  {
                name: "Campaign",
                description: "Newly Added Campaign Object",
                objecttype : 'project',
                templateobject : 'false'
            };

            // add project with 200
            request(url)
                .post('/objects')
                .send(newProjectObject)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                });

            // count objects should have one more (6)

            request(url)
                .get('/projects')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('objecttype');
                    res.body.length.should.eql(2);
                    recordId = res.body[0]._id;
                    console.log(recordId);
                    done();
                });
        });
    });



    describe('Find a Project Specific Record', function() {
        it('should return a project record ', function(done) {

            request(url)
                .get('/objects/' + recordId)
                .expect(200)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    res.body.name.should.eql('Project');
                    done();
                });
        });
    });

//    describe('Update the Project Record', function() {
//        it('should update and return  a project record ', function(done) {
//
//            request(url)
//                .put('/objects/' + recordId)
//                .send({description : 'Updated'})
//                .expect(200)
//                .end(function(err,res) {
//                    if (err) {
//                        throw err;
//                    }
//                    console.log(res.body.description);
//                    done();
//                });
//        });
//    });


});
