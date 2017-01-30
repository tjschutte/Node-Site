/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

/**
 * Controllers (route handlers).
 */
const indexController = require('./controllers/index');
const contactController = require('./controllers/contact');
const projectsController = require('./controllers/projects');


/**
 * Create Express server.
 */
const app = express();
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public'))); // space for images and static stuff

/** bodyParser.urlencoded(options)
* Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
* and exposes the resulting object (containing the keys and values) on req.body
*/
app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());

/**
 * Primary app routes.
 */
app.get('/', indexController.index);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/projects', projectsController.getProjects);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
