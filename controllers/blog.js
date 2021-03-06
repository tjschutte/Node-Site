var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });
/**
 * GET /
 * Blog page.
 */
exports.getBlog = (req, res) => {
    /**
     * Plan:
     * When you come to this page, render a generic page with the newest post and then a bunch of link to other posts
    */

    var params = {
        TableName: "Blog_Posts"
    };
    dynamodb.describeTable(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);

            var numPosts = data.Table.ItemCount;

            var num = numPosts - 100;

            var params = {
                ExpressionAttributeValues: {
                    ":ID": {
                        N: String(num)
                    }
                },
                FilterExpression: "ID >= :ID",
                TableName: "Blog_Posts"
            };
            dynamodb.scan(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    // Sort the data
                    console.log("Presort", data.Items);
                    postLinks = data.Items.sort(function(a, b) {
                        return parseInt(b.ID.N) - parseInt(a.ID.N);
                    });
                    console.log("Postsort", data.Items);
                    res.render('blog.html', { posts: data.Items });
                    console.log('GET: /Blog');
                }
            });
        }
    });
};

exports.getBlogPost = (req, res) => {
    // /blog/_______ will let you go directly to a post titled _______
    var url = req.url;
    var title = url.substring(url.lastIndexOf("/") + 1);
    url = url.substring(0, url.lastIndexOf("/"));
    title = replaceAll(title, "_", " ");
    title = decodeURI(title);

    id = url.substring(url.lastIndexOf("/") + 1);
    console.log("ID:", id);
    console.log("Title:", title);

    console.log('GET:/' + id + "/" + title);

    var params = {
        Key: {
            "Title": {
                S: title
            },
            "ID": {
                N: id
            },
        },
        TableName: "Blog_Posts"
    };
    dynamodb.getItem(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            res.render('404_blog.html');
        } else {
            if (data.Item != undefined) {
                res.render('post.html', { post: data.Item });
            } else {
                console.log(data);
                console.log("Could not find post:", title);
                res.render('404_blog.html');
            }
        }
    });
};

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
};