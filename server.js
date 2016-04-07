'use strict';

var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs'),
    logger = require('winston'),
    express = require('express'),
    http = require('http');

var config = require('./Config.js');

require('./YoutubeServer.js')(app,io);
require('./ShutdownServer.js')(app,io,config);

logger.add(logger.transports.File, { filename: 'winston.log' });
logger.remove(logger.transports.Console);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/public/index.html');
});

server.listen(8180);
