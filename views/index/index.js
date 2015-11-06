'use strict';

require.config(__FRAMEWORK_CONFIG__);

require.async([],function(){

    var _app = {
        init : function(){
            document.body.innerHTML = '<h1>Hello world!</h1>';
        }
    }

    _app.init();
});

