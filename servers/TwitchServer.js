'use strict'

module.exports = function (app, io, path) {
  app.get('/Twitch', (req, res) => {
    res.sendfile(path.join(__dirname, '../public/src/Twitch/Twitch.html'))
  })

  var currentChannel

  io.sockets.on('connection', (socket) => {
    socket.on('Twitch:new', (channel) => {
      currentChannel = channel
      socket.broadcast.emit('Twitch:new', channel)
    })

    socket.on('Twitch:connection', () => {
      socket.emit('Twitch:connected', currentChannel)
    })
  })
}

