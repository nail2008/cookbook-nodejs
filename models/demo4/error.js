/**
 * Created by Neil on 2015-7-16.
 */
var events = require('events');

var emitter = new events.EventEmitter();

emitter.emit('error');