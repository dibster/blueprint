// contains all base object rest api calls

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('blueprintdb', server);


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'blueprintdb' database");
        db.collection('kaboodleobjects', {strict:true}, function(err, collection) {
        });
    }
});


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving kaboodleobject: ' + id);
    db.collection('kaboodleobjects', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            console.log(item);
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    requiredObjectType = req.route.path.substring(1, req.route.path.length - 1);
    console.log(requiredObjectType);

    if (requiredObjectType === 'object') {
        db.collection('kaboodleobjects', function(err, collection) {
            collection.find().toArray(function(err, items) {
                res.send(items);
            });
        });
    }
    else
    {
        db.collection('kaboodleobjects', function(err, collection) {
            collection.find({ objecttype: requiredObjectType }).toArray(function(err, items) {
                res.send(items);
            });
        });
    }

};


exports.addKaboodleobject = function(req, res) {
    var kaboodleobject = req.body;
    console.log('Adding kaboodleobject: ' + JSON.stringify(kaboodleobject));
    db.collection('kaboodleobjects', function(err, collection) {
        collection.insert(kaboodleobject, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateKaboodleobject = function(req, res) {
    var id = req.params.id;
    var kaboodleobject = req.body;
    console.log('Updating kaboodleobject: ' + id);
    console.log(JSON.stringify(kaboodleobject));
    db.collection('kaboodleobjects', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, {$set: kaboodleobject}, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating kaboodleobject: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(kaboodleobject);
            }
        });
    });
}

exports.deleteKaboodleobject = function(req, res) {
    var id = req.params.id;
    console.log('Deleting kaboodleobject: ' + id);
    db.collection('kaboodleobjects', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

