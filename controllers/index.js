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

exports.pagenotfound = (req, res) => {
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	res.render('404.html');
};

var count = count || 0;
var date = date || new Date();

exports.bodycountget = (req, res) => {
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	console.log('GET: /rachelisliterallydying from', ip, " on ", dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

	res.render('deaths.html', {
		body: count,
		time: dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT")
	});
};

exports.bodycountpost = (req, res) => {
	console.log('POST: /rachelisliterallydying');

	count++;
	date = new Date();
	res.render('deaths.html', {
		body: count,
		time: dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT")
	});
};
