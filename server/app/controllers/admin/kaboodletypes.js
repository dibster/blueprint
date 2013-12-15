// contains all base object rest api calls
exports.findAll = function(req, res) {
    db.collection('kaboodletypes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
