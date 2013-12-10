var express = require('express'),
    objects = require('./app/controllers/objects');
    emptyDBTests = require('./app/controllers/resetDBforTests');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});


// route for tests only, remove on prod

app.get('/api/resetDB',emptyDBTests.emptyDB);

// general object object routes

app.get('/api/objects', objects.findAll);
app.get('/api/objects/:id', objects.findById);
app.post('/api/objects', objects.add);
app.put('/api/objects/:id', objects.update);
app.delete('/api/objects/:id', objects.remove);

app.get('/api/objects/:id/fields', objects.findAllFields);
app.get('/api/objects/:id/views', objects.findAllViews);



// routs by type

app.get('/api/projects', objects.findProjects);
app.get('/api/assets', objects.findAssets);
app.get('/api/milestones', objects.findMilestones);
app.get('/api/tasks', objects.findTasks);
app.get('/api/lookups', objects.findLookups);



app.listen(3000);
console.log('Kaboodle Blueprint API listening on port 3000...');

