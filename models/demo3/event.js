/**
 * Created by Neil on 2015-7-16.
 */
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event', function () {
    console.log('some_event occured.');
});

setTimeout(function () {
    event.emit('some_event');
},1000);