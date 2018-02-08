const dateFormat = require('dateformat');

/**
 * GET
 * Home page.
 */
exports.index = (req, res) => {
	var ip = req.headers['x-forwarded-for'] ||
    	req.connection.remoteAddress ||
    	req.socket.remoteAddress ||
     	req.connection.socket.remoteAddress;
	console.log('GET: /index from', ip, " on ", dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

	res.render('index.html');
 };

/**
	For the 404 page. Still not sure how I want to handle this
*/
exports.pagenotfound = (req, res) => {
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	console.log("Attempt to go to: ", req.url);
	res.render('404.html');
};
