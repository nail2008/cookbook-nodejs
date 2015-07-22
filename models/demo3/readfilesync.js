/**
 * Created by Neil on 2015-7-16.
 */
var fs = require('fs');
var data = fs.readFileSync('file.txt','utf-8');
console.log(data);
console.log('end.');