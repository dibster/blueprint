/**
 * Created by dibster on 1/19/14.
 */

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving tags by Id: ' + id);
    db.collection('kaboodletags', function(err, collection) {
        collection.findOne({'name' : id}, function(err, item) {
            res.send(item);
        });
    });
};