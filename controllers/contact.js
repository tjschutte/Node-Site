/**
 * GET /
 * contact page.
 */
exports.getContact = (req, res) => {
  res.render('contact.html');
  console.log('GET: /contact');
};

/*
  POST
  contact page.
*/
exports.postContact = (req, res) => {
  console.log('POST: /contact');
  console.log(req.body.name.val);
  console.log(req.body.email.val);
  console.log(req.body.message.val);
  res.redirect('..');
}
