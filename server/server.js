var express = require('express'),
    objects = require('./app/controllers/objects');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});


// general project object routes

app.get('/objects', objects.findAll);
app.get('/objects/:id', objects.findById);
app.post('/objects', objects.addKaboodleobject);
app.put('/objects/:id', objects.updateKaboodleobject);
app.delete('/objects/:id', objects.deleteKaboodleobject);

// project routes

app.get('/projects', objects.findAll);



app.listen(3000);
console.log('Kaboodle Blueprint listening on port 3000...');

