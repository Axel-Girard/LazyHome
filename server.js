'use strict'

var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var logger = require('winston')
var express = require('express')
var path = require('path')

var config = require('./Config.js')

require('./YoutubeServer.js')(app, io, path)
require('./ShutdownServer.js')(app, io, config)

logger.add(logger.transports.File, { filename: 'winston.log' })
logger.remove(logger.transports.Console)

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '/public/index.html'))
})

server.listen(8180)
