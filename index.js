console.log("Starting Node with following options:", process.argv);

DEV_MODE = false

if (process.argv[2] == 'dev') {
  DEV_MODE = true
  console.log("In development mode.")
}

console.log("DEV_MODE:", DEV_MODE)

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

// In dev mode, we won't have these items.
if (!DEV_MODE) {
  const key = fs.readFileSync('encryption/private.key');
  const cert = fs.readFileSync('encryption/server.crt' );

  var options = {
    key: key,
    cert: cert,
  };
}

/**
 * Create Express server.
 */
const app = express();
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use('/static', express.static('public'));
app.use(favicon(__dirname + '/public/res/photos/favicon.ico'));

// Force us to use https only when in prod
if (!DEV_MODE) {
  app.use(forceSsl);
}

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

// If prod, then force https, else use http
if (!DEV_MODE) {
  https.createServer(options, app).listen(443);
}

http.createServer(app).listen(80);

console.log('Server ready');
module.exports = app;