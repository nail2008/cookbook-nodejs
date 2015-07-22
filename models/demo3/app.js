/**
 * Created by Neil on 2015-7-16.
 */
//cd public\javascripts\demo3
//node app.js
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
}).listen(3000);
console.log("HTTP server is listening at port 3000.");

//supervisor app.js
//当文件修改后，会自动重启
//安装 npm install -g supervisor