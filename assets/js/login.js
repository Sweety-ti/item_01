$(".click-taggle").on("click", function () {
    if ($(this).attr("data-taggle") == "0") {
        $("#login").hide();
        $("#register").show();
        $(this).attr("data-taggle", "1").html("去登录!");
    } else if ($(this).attr("data-taggle") == "1") {
        $("#register").hide();
        $("#login").show();
        $(this).attr("data-taggle", "0").html("没账号？去注册！");
    }
});
//创建form对象
var form = layui.form;
form.verify({
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    register: function(value, item) {
        if ( !($("#psw").val() === value) ) {
            return "确认密码必须和密码相同"
        }
    }
});
//表单提交
$.ajaxPrefilter(function(options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
});
var layer = layui.layer;
$("#register").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/api/reguser",
        data: $(this).serialize(),
        success: function(result) {
            if (result.status == 1) {
                return layer.msg(result.message);
            }
            $(".click-taggle").click();
            return layer.msg("注册成功,去登录吧")
        }
    })
});
$("#login").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/api/login",
        data: $(this).serialize(),
        success: function(result) {
            if (result.status == 1) {
                return layer.msg(result.message);
            }
            localStorage.setItem("token", result.token);//设置值
            layer.msg("登录成功，跳转页面中...");
            setTimeout(() => {
                location.href = "./index.html";
            }, 500);
        }
    })
});