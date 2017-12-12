'use strict';
const express = require('express');
const compress = require('compression');//gzip
const app = express();
const path=require('path');
const port=9091;//端口号
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended:true});
app.use(compress());


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

    
route('ims');
route('crm');
route('fbps');
route('rcm');



app.listen(port);
console.log('前端项目已启动，端口号：'+port+'...');

//catch
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});