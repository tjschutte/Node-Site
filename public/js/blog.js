var post = post || 0;

function getPost(p) {

    var val = parseInt(p);
    if (val == - 1){
        post = post + 1;
    } else if (val == -2){
        post = post - 1;
    } else {
        post = val;
    }
    if (post < 0){
        post = 0;
    }

    $.ajax({url: "/getPost?data=" + parseInt(post),
        complete: function() {
            console.log('process complete');
        },

        success: function(data) {
            post = parseInt(data.postid);
            document.getElementById("post").innerHTML = data.html;
            console.log('process sucess');
       },

        error: function() {
            console.log('process error');
        }
    });
}
