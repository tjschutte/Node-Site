const dateFormat = require('dateformat');
/**
 * GET /
 * projects page.
 */
exports.getProjects = (req, res) => {
    var ip = req.headers['x-forwarded-for'] ||
    	req.connection.remoteAddress ||
    	req.socket.remoteAddress ||
     	req.connection.socket.remoteAddress;
    console.log('GET: /projects from', ip, " on ", dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
    res.render('projects.html');
};
