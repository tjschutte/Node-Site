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

exports.bodycountget = (req, res) => {
	console.log('GET: /rachelisliterallydying');
	res.render('deaths.html', {
		body: count
	});
};

exports.bodycountpost = (req, res) => {
	console.log('POST: /rachelisliterallydying');
	count++;
	console.log(count);
	res.render('deaths.html', {
		body: count
	});
};
