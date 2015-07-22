/**
 * Created by Neil on 2015-7-16.
 */
var fs = require('fs');

//默认以二进制方式读取
fs.readFile('file.txt','utf-8', function (err, data) {
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
});