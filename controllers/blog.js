const fs = require('fs');
const posts = require('../posts.json');

/**
 * GET /
 * Blog page.
 */
exports.getBlog = (req, res) => {
    res.render('blog.html', { posts: posts.content });
    console.log('GET: /Blog');
};

/**
 *
 * AJAX
 */
exports.getPost = (req, res) => {
	res.status(200);
	res.readyState = 4;
    var postid = parseInt(req.query.data);
    console.log('Retrieving post: ', postid);

    // bounds checking
    if (postid < 0)
        postid = 0;
    else if (postid > posts.content.length - 1)
        postid = parseInt(posts.content.length - 1);

    fs.readFile(posts.content[postid].location, 'UTF-8', function read(err, data) {
        if (err) {
            throw err;
        }
        res.send({ html: data, postid: postid, posts: posts.content });
    });
};
