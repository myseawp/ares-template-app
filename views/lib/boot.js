require.config(__FRAMEWORK_CONFIG__);

//处理模块跳转
var moduleCallback = function (boot) {

    var parseQueryString = function( url ){
        var reg_url =/^[^\?]+\?([\w\W]+)$/,
            reg_para=/([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
            arr_url = reg_url.exec( url ),
            ret        = {};
        if( arr_url && arr_url[1] ){
            var str_para = arr_url[1],result;
            while((result = reg_para.exec(str_para)) != null){
                ret[result[1]] = result[2];
            }
        }
        return ret;
    }
    //将参数转化为模块对象
    var data = parseQueryString(window.location.href);

    if(!require.config().debug){
        //运行模式，监听jsbridge事件
        if (window.WebViewJavascriptBridge) {
            boot(data);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                boot(data);
            }, false);
        }

    }else{
        boot(data)
    }

}


//根据html-view名称匹配对应的模块
var url = window.location.href
var re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
var arr = url.match(re);


var moduleName = arr[5].substr(0, arr[5].length - 5);
//框架编译，不要修改


__FRAMEWORK_REDIRECTFIG__;



