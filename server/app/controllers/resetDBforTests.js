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

exports.emptyDB = function(req,res) {
    console.log("Connected to 'blueprintdb' database");
    db.collection('kaboodleobjects').remove({},function(err,numberRemoved){
        console.log("inside remove call back" + numberRemoved);
    });
    db.collection('kaboodleobjects', {strict:true}, function(err, collection) {
        populateDB();
        res.send('Database Reset');
    });
};

var populateDB = function() {
    var fs = require('fs');
    var file = './app/controllers/testData/kaboodleobjects.json';

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('kaboodleobjects', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err, result) {
                if (err) {
                    throw err;
                }
                db.close();
            });
        });
    });
};
