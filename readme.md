## 本地运行

1. 依次安装docker、node、fun
参考：https://github.com/alibaba/funcraft/blob/master/docs/usage/installation-zh.md

2. 安装项目依赖
    ```
    $ npm install
    ```

2. 进入文件夹，输入命令
    ```
    $ fun local start fc.qeservice.top
    ```
    如果有权限问题就加sudo

    它会自己下载一会runtime，最后正确运行的话会出现
    ```
    using template: template.yml
    CustomDomain fc.qeservice.top of photoprocess/photoprocess was registered
            url: http://localhost:8000/photoprocess/
            methods: [ 'POST', 'GET' ]
            authType: ANONYMOUS

    function compute app listening on port 8000!
    ```

    点击url打开浏览器即可

## 说明

* 运行时：https://help.aliyun.com/document_detail/74757.html
* 入口文件：index.js
* 用户界面：index.html
* 图片处理库imagemagick: https://www.npmjs.com/package/imagemagick