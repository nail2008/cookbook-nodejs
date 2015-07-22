/**
 * Created by Neil on 2015-7-16.
 */
var name;

exports.setName = function (thyName) {
    name = thyName;
};

exports.sayHello = function () {
    console.log('Hello ' + name);
};