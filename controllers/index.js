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
