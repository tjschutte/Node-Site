/**
 * GET
 * Home page.
 */
exports.index = (req, res) => {
   res.render('index.html');
   console.log('GET: /index');
 };
