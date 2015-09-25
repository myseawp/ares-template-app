require.config(__FRAMEWORK_CONFIG__);


__inline('handlebars.runtime-v4.0.3.js');


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

var strUrl = window.location.href;
var arrUrl = strUrl.split("/");
var strPage = arrUrl[arrUrl.length - 1];


var moduleName = strPage.split(".")[0];
/**
 * 根据页面自动查找模块
 *
 * 例如：页面是index，查找components/index/index.js模块
 * 请注意，所有模块需要符合commonjs规范
 *
 */
require.async(moduleName,moduleCallback);


