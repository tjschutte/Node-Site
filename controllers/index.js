const dateFormat = require('dateformat');
const deathsfile = require('../deathsfile.json');
const fs = require('fs');
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
	res.render('404.html');
};

var date = date || new Date();
date.setHours(date.getHours() - 7);
var deaths = deaths || deathsfile;
var count = count || deaths.length;

exports.bodycountget = (req, res) => {
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	console.log('GET: /rachelisliterallydying from', ip, " on ", dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

	var datestr = dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");

	res.render('deaths.html', {
		body: count,
		time: datestr,
		deaths: deaths
	});
};

exports.bodycountpost = (req, res) => {
	console.log('POST: /rachelisliterallydying');

	count++;
	date = new Date();
	date.setHours(date.getHours() - 7);
	var datestr = dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");

	var death = new Object();
	death["count"] = count;
	death["tod"] = datestr;
	death["cod"] = req.body.cod.val;
	deaths.push(death);
	//console.log(deathsfile);

	fs.writeFile('deathsfile.json', JSON.stringify(deaths), 'utf8', null);

	res.render('deaths.html', {
		body: count,
		time: datestr,
		deaths: deaths
	});
};
