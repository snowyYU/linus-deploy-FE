# linus 下前端部署方案 #

## 说明 ##
1. 此目录下的相关安装包放置了node的压缩包
2. img放置了此文所用到图片的图床
3. dist为部署模版

## 安装nodejs ##
>当前使用的node版本为6.10.3

1. 将此目录下的相关安装包中的node包解压，放置linus系统目录下


2. 进入bin目录下，在此文件下打开命令行，执行`node -v`,若出现版本号则说明node包没问题

[执行命令后img1]()

3. 配置软连接，先获取bin文件下node和npm的路径，执行`pwd`

[执行命令后img2]()

4. 再执行
    ```
    ln -s 上面获取的地址/node /usr/local/bin/node 
    ln -s 上面获取的地址/npm /usr/local/bin/npm
    ```

>示例执行如下

    ln -s /home/snowy/mysoftware/node-v/node-v8.9.3-linux-x64/bin/node /usr/local/bin/node
    ln -s /home/snowy/mysoftware/node-v/node-v8.9.3-linux-x64/bin/npm /usr/local/bin/npm
    

5. done,在别的目录下打开命令行，执行`node -v`，出现版本号说明配置成功

6. 将目录下的dist中的文件拷贝到生产环境对应的文件夹下

7. 在指定文件夹下执行 node app.js


## 启动文件app.js说明 ##

```
'use strict';
const express = require('express');
const compress = require('compression');//gzip
const app = express();
const path=require('path');
const port=9091;//******端口号配置在此
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended:true});
app.use(compress());

//projectName为访问的项目名，defaultFile为入口文件，参数为空默认为index.html
var route=function(projectName,defaultFile){

    app.get('/'+projectName+'*', function (request, response) {
        if(request.path.match(/[\S]+\.[\S]+$/)){
            response.sendStatus(404);
        }else{
            app.use(express.static(__dirname+'/'+projectName+'/dist'));
            response.sendFile(path.resolve(__dirname, projectName+'/dist',defaultFile||'index.html'));
        }
   });
}

//*****配置各项目的访问路径
route('ims');
route('crm');
route('fbps');
route('rcm');

app.listen(port);

//留意命令行的提示，是否启动成功
console.log('前端项目已启动，端口号：'+port+'...');

//catch
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
```

## 注意事项 ##

app.js 引入了express和compression两个包，注意这两个包是否已安装

## 参考链接 ##
1. [nodejs](https://nodejs.org/zh-cn/)
2. [linus下的node](http://www.cnblogs.com/dubaokun/p/3558848.html)