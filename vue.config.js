const path =  require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? '' : '../dist/',
    outputDir: './dist/',
    // publicPath:'/',
    devServer: {
        port: 8081,
        proxy: {
            '/devApi': {
                target: 'http://xxxx.baidu.com',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/devApi': ''
                }
            }
        },
        disableHostCheck: true //内网穿透
    },
    productionSourceMap:false,
     //配置多页面
    pages:{
        //键值为入口名
        index:{
            entry:"src/main/index/main.js",//入口文件具体位置
            template:"public/index.html"//入口文件使用的模板
        },
        login:{
            entry:"src/main/login/main.js",
            template:"public/login.html"
        },
        activity:{
            entry:"src/main/activity/main.js",
            template:"public/activity.html"
        }
    },
    chainWebpack: config => {
        config.resolve.alias
        .set('@', resolve('src'));
    },
};