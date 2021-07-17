//设置前提
$.ajaxPrefilter(function (options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // 在每次请求之前 把url换成根路径加上绝对路径
    if (options.url.indexOf("/my/") != -1) {
        //不返回-1就是找到了
        options.headers = {
            //设置键和值
            Authorization: localStorage.getItem("token"),
        }
    }
    options.complete = function(result) {
         // 每次发送请求都会调用
        if (result.responseJSON.message == "身份认证失败！") {
            location.href = "./login.html";
        }
     }
});
let layer = layui.layer;
getInfo();
function getInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (result) {
            if (result.status == 1) return layer.msg(result.message + "推荐重新登录")
            //优先显示nickname
            if (result.data.nickname) {
                $("#welcome").html("欢迎 " + result.data.nickname);
            } else {
                $("#welcome").html("欢迎 " + result.data.username);
            }
            //优先显示自己的头像
            if (result.data.user_pic) {
                $("#head-pic1").prop("src", result.data.user_pic);
                $("#head-pic2").prop("src", result.data.user_pic);
            }
        }
    });
}
$("#quit").on("click", function () {
    layer.confirm('确认是否关闭', { icon: 3, title: '提示' }, function (index) {
        //do something
        localStorage.removeItem("token");
        location.href = "./login.html"
        layer.close(index);
    });
});
