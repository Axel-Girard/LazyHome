'use strict'

var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var logger = require('winston')
var express = require('express')
var path = require('path')

var config = require('./Config.js')

logger.add(logger.transports.File, { filename: './logs/winston.log' })
logger.remove(logger.transports.Console)

require('./servers/YoutubeServer.js')(app, io, path)
require('./servers/ShutdownServer.js')(app, io, config, logger)
require('./servers/TwitchServer.js')(app, io, path)

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '/public/index.html'))
})

logger.log('info', 'Start on port 8180')

server.listen(8180)

console.log('Running : 192.168.1.10:8180')
