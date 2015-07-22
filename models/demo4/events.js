/**
 * Created by Neil on 2015-7-16.
 */
var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('someEvent', function (arg1,arg2) {
    console.log('listener1',arg1,arg2);
});

emitter.on('someEvent', function (arg1,arg2) {
    console.log('listener2',arg1,arg2);
});

emitter.emit('someEvent','byvoid',1991);
