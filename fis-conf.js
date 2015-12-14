var meta = require('./package.json');
//设置发布服务地址，实际开发配置receiver地址为后台资源服务地址
fis.config.set('modules.deploy', ['default', 'zip'])
fis.config.set('settings.deploy.zip', {
    publish : [{
        from : '/',
        to: '/',
        include : ["/public/**"],
        file: './output/www.zip',
        "server": {
            "receiver": "http://127.0.0.1:8888/api/upload",
            "data": {
                "appId":123

            }
        }
    }]
});
//设置生态组件服务地址
fis.config.set('repo',{
    remote_protocol:'gitlab',
    remote_url:'http://192.168.1.206/'
})

//配置内置handlebars模板支持
fis.config.set('modules.parser.handlebars', 'handlebars-4.x');
fis.config.set('project.fileType.text', 'handlebars');
fis.config.set('roadmap.ext.handlebars', 'js');

fis.config.set('name', meta.name);
fis.config.set('version', meta.version);
fis.config.set('project.exclude', 'node_modules/**');
fis.config.set('framework', {
    cache: false,
    urlPattern: '/c/%s',
    comboPattern: '/co??%s'
});