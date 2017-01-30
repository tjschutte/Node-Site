
const config = require('../config.json');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://' + config.email + ':' + config.email_password + '@smtp.gmail.com');

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

  var mailOptions = {
    from: req.body.name.val + '<' + req.body.email.val + '>', // sender address
    to: 'tjschutte@wisc.edu', // list of receivers
    subject: 'From-Site', // Subject line
    text: req.body.message.val, // plaintext body
  };

  console.log(req.body.name.val);
  console.log(req.body.email.val);
  console.log(req.body.message.val);

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
  res.redirect('..');
}
