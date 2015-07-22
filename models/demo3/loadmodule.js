/**
 * Created by Neil on 2015-7-16.
 */
//node是单次加载，require不会重复加载模块

var hello1 = require('./module');
hello1.setName('BYVoid');

var hello2 = require('./module');
hello2.setName('BYVoid 2');

hello1.sayHello();