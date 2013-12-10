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
        db.collection('kaboodleobjects', {strict: true}, function(err, collection) {
            if (err) {
                console.log("The objects collection is empty...");
            }
        });
    }
});

exports.findProjects = function(req,res) {
    db.collection('kaboodleobjects', function(err, collection) {
        collection.find({'type' : 'project'}).toArray(function(err, items) {
            res.send(items);
        });
    });
};
exports.findTasks = function(req,res) {
    db.collection('kaboodleobjects', function(err, collection) {
        collection.find({'type' : 'task'}).toArray(function(err, items) {
            res.send(items);
        });
    });
};
exports.findMilestones = function(req,res) {
    db.collection('kaboodleobjects', function(err, collection) {
        collection.find({'type' : 'milestone'}).toArray(function(err, items) {
            res.send(items);
        });
    });
};
exports.findAssets = function(req,res) {
    db.collection('kaboodleobjects', function(err, collection) {
        collection.find({'type' : 'asset'}).toArray(function(err, items) {
            res.send(items);
        });
    });
};
exports.findLookups = function(req,res) {
    db.collection('kaboodleobjects', function(err, collection) {
        collection.find({'type' : 'lookup'}).toArray(function(err, items) {
            res.send(items);
        });
    });
};


exports.findAll = function(req, res) {
    db.collection('kaboodleobjects', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log('objects send from DB');
            res.send(items);
        });
    });
};

exports.findAllFields = function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.collection('kaboodleobjects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)},{fields: {fields:1}}, function(err, item) {
            res.send(item);
        });
    });
};
exports.findAllViews = function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.collection('kaboodleobjects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)},{fields: {views:1}}, function(err, items) {
            res.send(items);
        });
    });
};
//
//exports.findAllViewFields = function(req, res) {
//    var id = req.params.id;
//    var viewname = req.params.viewname;
//    console.log(viewname);
//    // add view name to query
//    db.collection('kaboodleobjects', function(err, collection) {
//        collection.findOne({'_id': new BSON.ObjectID(id), 'views.name' : viewname},{fields: {fields:1}}, function(err, items) {
//            res.send(items);
//        });
//    });
//};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving object: ' + id);
    db.collection('kaboodleobjects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.add = function(req, res) {
    var object = req.body;
    console.log('Adding object: ' + JSON.stringify(object));
    db.collection('kaboodleobjects', function(err, collection) {
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
    db.collection('kaboodleobjects', function(err, collection) {
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
    db.collection('kaboodleobjects', function(err, collection) {
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

