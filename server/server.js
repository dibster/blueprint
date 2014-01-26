var express = require('express'),
    objects = require('./app/controllers/admin/objects');
    fieldtypes = require('./app/controllers/admin/fieldtypes');
    kaboodletypes = require('./app/controllers/admin/kaboodletypes');
    kaboodleprojects = require('./app/controllers/kaboodle/kaboodleprojects');
    kaboodlelists = require('./app/controllers/kaboodle/kaboodlelists');
    kaboodletags = require('./app/controllers/kaboodle/kaboodletags');
    emptyDBTests = require('./app/controllers/testData/resetDatabaseForTests');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};


// enable CORS!
app.use(enableCORS);

// route for tests only, remove on prod

app.get('/api/resetDB',emptyDBTests.emptyDB);

// general object object routes

app.get('/api/objects', objects.findAll);
app.get('/api/objects/:id', objects.findById);
app.post('/api/objects', objects.add);
app.put('/api/objects/:id', objects.update);
app.delete('/api/objects/:id', objects.remove);

// Kaboodle Project Routes

app.get('/api/kaboodleprojects', kaboodleprojects.findAll);
app.get('/api/kaboodleprojects/:id', kaboodleprojects.findById);
app.get('/api/kaboodleprojectsforuser/:id', kaboodleprojects.findByUser);
app.post('/api/kaboodleprojects', kaboodleprojects.add);
app.put('/api/kaboodleprojects/:id', kaboodleprojects.update);
app.delete('/api/kaboodleprojects/:id', kaboodleprojects.remove);

// Kaboodle List Routes

app.get('/api/kaboodlelists', kaboodlelists.findAll);
app.get('/api/kaboodlelists/:id', kaboodlelists.findById);
app.post('/api/kaboodlelists', kaboodlelists.add);
app.put('/api/kaboodlelists/:id', kaboodlelists.update);
app.delete('/api/kaboodlelists/:id', kaboodlelists.remove);
app.get('/api/kaboodlelistsbyname/:id', kaboodlelists.findByListName);

// fields and views


app.get('/api/objects/:id/fields', objects.findAllFields);
app.get('/api/objects/:id/views', objects.findAllViews);



// routes by type

app.get('/api/projects', objects.findProjects);
app.get('/api/assets', objects.findAssets);
app.get('/api/milestones', objects.findMilestones);
app.get('/api/tasks', objects.findTasks);
app.get('/api/lookups', objects.findLookups);

// tags

app.get('/api/kaboodletags/:id', kaboodletags.findById);

// admin routes
app.get('/api/fieldtypes', fieldtypes.findAll);
app.get('/api/kaboodletypes', kaboodletypes.findAll);



app.listen(3000);
console.log('Kaboodle Blueprint API listening on port 3000...');

