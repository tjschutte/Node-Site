
const config = require('../config.json');
const nodemailer = require('nodemailer');
const dateFormat = require('dateformat');

var transporter = nodemailer.createTransport('smtps://' + config.email + ':' + config.email_password + '@smtp.gmail.com');

/**
 * GET /
 * contact page.
 */
exports.getContact = (req, res) => {
    var ip = req.headers['x-forwarded-for'] ||
    	req.connection.remoteAddress ||
    	req.socket.remoteAddress ||
     	req.connection.socket.remoteAddress;
    console.log('GET: /contact from', ip, " on ", dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
    res.render('contact.html');

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
