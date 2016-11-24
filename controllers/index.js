/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('index.html');
  console.log('GET: /index');
};

/*
  POST
  Home page.
*/
exports.postIndex = (req, res) => {

}
