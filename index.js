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
app.set('port', process.env.PORT || 443);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//app.use(express.static(path.join(__dirname, 'public'))); // space for images and static stuff
app.use('/static', express.static('public'))

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
app.get('/getPost', blogController.getPost);

app.get('/rachelisliterallydying', indexController.bodycountget);
app.post('/rachelisliterallydying', indexController.bodycountpost);

// 404 page
app.get('*', indexController.pagenotfound);

/**
 * Start Express server.
 */
//app.listen(app.get('port'), () => {
//  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
//});

// Force use to use https
app.use(forceSsl);

https.createServer(options, app).listen(443);
http.createServer(app).listen(80);
console.log('Express server listening');
module.exports = app;