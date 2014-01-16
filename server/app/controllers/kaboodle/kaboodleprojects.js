// contains all base object rest api calls

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('blueprintdb', server);

db.open(function(err, db) {
    if (!err) {
        console.log("Connected to blueprint database");
        db.collection('kaboodleprojects', {strict: true}, function(err, collection) {
            if (err) {
                console.log("The objects collection is empty...");
            }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection('kaboodleprojects', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log('objects send from DB');
            res.send(items);
        });
    });
};


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving projects by User: ' + id);
    db.collection('kaboodleprojects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

// TODO get just the data we need once I have figured that out

exports.findByUser = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving object: ' + id);
    db.collection('kaboodleprojects', function(err, collection) {
        collection.find({ 'tasks.who': id }).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.add = function(req, res) {
    var object = req.body;
    // Add a user and date created field to the object somewhere here
    db.collection('kaboodleprojects', function(err, collection) {
        collection.insert(object, {safe: true}, function(err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body;
    console.log('Updating object: ' + id);
    console.log(JSON.stringify(object));
    delete object._id;
    db.collection('kaboodleprojects', function(err, collection) {
        collection.update({'_id': new BSON.ObjectID(id)}, object, {safe: true}, function(err, result) {
            if (err) {
                console.log('Error updating object: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(object);
            }
        });
    });
};

exports.remove = function(req, res) {
    var id = req.params.id;
    console.log('Removing object: ' + id);
    db.collection('kaboodleprojects', function(err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function(err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) removed');
                res.send(req.body);
            }
        });
    });
};

