/**
 * Created by Neil on 2015-7-16.
 */
function Hello() {
    var name;

    this.setName = function (thyName) {
        name = thyName;
    };

    this.sayHello = function () {
        console.log('Hello ' + name);
    };
};

module.exports = Hello;