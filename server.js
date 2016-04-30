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

require('./YoutubeServer.js')(app, io, path)
require('./ShutdownServer.js')(app, io, config, logger)

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '/public/index.html'))
})

logger.log('info', 'Start on port 8180')

server.listen(8180)
