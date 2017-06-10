var dateFormat = require('dateformat');
/**
 * GET
 * Home page.
 */
exports.index = (req, res) => {
	res.render('index.html');
	console.log('GET: /index');
 };

exports.pagenotfound = (req, res) => {
	res.render('404.html');
    console.log('GET: /404');
};

var count = count || 0;
var date = date || new Date();

exports.bodycountget = (req, res) => {
	console.log('GET: /rachelisliterallydying');
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
