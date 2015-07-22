var settings = require('../settings'),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, 27017, {}), {safe: true});