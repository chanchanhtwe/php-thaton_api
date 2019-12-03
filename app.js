

$(function(){

    $("#newPostForm").on('submit',function (e) {
        e.preventDefault();
        var title=$("#title").val();
        var content=$("#content").val();
        $.ajax({
            url: "new-post.php",
            type: "post",
            data: {
                title: title,
                content: content,
            },
            beforeSend: function () {

            },
            success: function (res) {
                console.log(res);
                $("#showData").html("");
                fetchPosts();
                $("#title").val("");
                $("#content").val("");
                $("#showMessage").html(res.message);
                $("#showMessage").removeClass("hide");
                setTimeout(function () {
                    $("#showMessage").addClass("hide");
                    $("#showMessage").html("");
                },2000)
            },
            error:function (err) {
                console.log(err);
            }

        })

    })

    fetchPosts();
    function fetchPosts(){
        $.ajax({
            url: "posts.php",
            type: "get",
            beforeSend:function () {
                console.log("Fetching data now.");

            },
            success: function(res){//response ျပန္တာ array
                //console.log(res); console မႈာျပတာ
                $.each(res,function (i,post) { //(i is 0,1,2,3--- and post is database data) are variable name
                    $("#showData").append("<tr><td>"+post.id+"</td><td>"+post.title+"</td><td>"+post.content+"</td><td>"+post.post_at+"</td><td><a myID="+post.id+" href='#'>Delete</a></td></tr>")
                })

            },
            error:function(){
                console.log("Something went wrong with server.")
            }
        });
    }
    $("body").delegate("#showData a",'click',function () {
        var id=$(this).attr("myId");
        var result=confirm("Are you sure delete this post?");
        if(result){
            $.ajax({
                url: 'delete.php',
                type: 'get',
                data: {id: id},
                success:function (res) {
                    $("#showData").html("");
                    fetchPosts();
                    $("#showMessage").html(res.message);
                    $("#showMessage").removeClass("hide");
                    setTimeout(function () {
                        $("#showMessage").addClass("hide");
                        $("#showMessage").html("");
                    },2000)
                }
            })
        }
    })
})