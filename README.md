# cinema

> 通过vue重写卖座网，仅供学习用途，没有进入真正的订单页面，望卖座网海涵

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 技术栈
vue2.0+vuex+axios+router(vue全家桶)+es2015(es6)

## 代理设置
直接请求接口，会出现跨域问题，所以中间加了一层server端，通过本地代理转发到server，然后才去请求真实的api

在config文件夹下的index.js进行配置

module.exports = {

  dev: {

    proxyTable: {

      "/api":{

        "target": "https://m.maizuo.com/v4/api/",

        "secure": false,

        "changeOrigin": true,

        "pathRewrite": {

          "^/api" : ""

        }

      },

    },

  }

}

### 项目截图
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/home.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic10.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic1.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic2.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic3.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic4.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic5.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic6.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic7.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic8.jpg?raw=true)
![](https://github.com/yufengji/cinema/blob/master/static/project-pic/pic9.jpg?raw=true)
