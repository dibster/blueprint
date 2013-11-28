var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('blueprintdb', server);


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'blueprintdb' database");
        db.collection('kaboodleobjects').remove({},function(err,numberRemoved){
            console.log("inside remove call back" + numberRemoved);
        });
        db.collection('kaboodleobjects', {strict:true}, function(err, collection) {
            populateDB();
        });
    }
});

//populateDB();
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data

var populateDB = function() {

    console.log('try populate');

    var kaboodleObjects = [
        {
            name: "Project",
            description: "Default Project Object ...",
            objecttype : 'project',
            templateobject : 'true',
            fields : [{name : 'Title', type : 'Text',req :'y'},
                      {name : 'Description', type : 'Note',req :'n'},
                      {name : 'Start', type : 'Date',req :'n'},
                      {name : 'End', type : 'Date',req :'n'},
                      {name : 'Status', type : 'List',req :'n',values :['a','b','c']},
                      {name : 'Owner', type : 'user',req :'n'}
                     ],
            views : [{ name : 'Create',
                    viewfields : [{name : 'Title', type : 'Text',req :'y'},
                        {name : 'Description', type : 'Note',req :'n'},
                        {name : 'Start', type : 'Date',req :'n'},
                        {name : 'End', type : 'Date',req :'n'},
                        {name : 'Status', type : 'List',req :'n',values :['a','b','c']},
                        {name : 'Owner', type : 'user',req :'n'}]
                    },
                    { name : 'Show',
                    viewfields : [{name : 'Title', type : 'Text',req :'y'},
                        {name : 'Description', type : 'Note',req :'n'},
                        {name : 'Start', type : 'Date',req :'n'},
                        {name : 'End', type : 'Date',req :'n'},
                        {name : 'Status', type : 'List',req :'n',values :['a','b','c']},
                        {name : 'Owner', type : 'user',req :'n'}]
                    }]
        },
        {
            name: "Milestone",
            description: "Default Milestone Object ...",
            objecttype : 'milestone',
            templateobject : 'true'
        },
        {
            name: "Task",
            description: "Default Task Object ...",
            objecttype : 'task',
            templateobject : 'true'
        },
        {
            name: "Asset",
            description: "Default Asset Object ...",
            objecttype : 'asset',
            templateobject : 'true'
        },
        {
            name: "Lookup",
            description: "Default Lookup Object ...",
            objecttype : 'lookup',
            templateobject : 'true'
        }
    ];

    db.collection('kaboodleobjects', function(err, collection) {
        collection.insert(kaboodleObjects, {safe:true}, function(err, result) {});
    });

};


/**
 * Created by dibster on 11/18/13.
 */
