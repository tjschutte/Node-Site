/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const forceSsl = require('express-force-ssl');
const favicon = require('serve-favicon');

/**
 * Controllers (route handlers).
 */
const indexController = require('./controllers/index');
const contactController = require('./controllers/contact');
const blogController = require('./controllers/blog');
const projectsController = require('./controllers/projects');

const key = fs.readFileSync('encryption/private.key');
const cert = fs.readFileSync('encryption/server.crt' );

var options = {
  key: key,
  cert: cert,
};

/**
 * Create Express server.
 */
const app = express();
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use('/static', express.static('public'));
app.use(favicon(__dirname + '/public/res/photos/favicon.ico'));

// Force us to use https
app.use(forceSsl);

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
app.get('/blog', blogController.getBlog);
app.get('/blog/*', blogController.getBlogPost);

// 404 page
app.get('*', indexController.pagenotfound);

https.createServer(options, app).listen(443);
http.createServer(app).listen(80);
console.log('Express server listening');
module.exports = app;
