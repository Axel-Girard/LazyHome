'use strict'

module.exports = function (app, io, path) {
  app.get('/Twitch/Chat', (req, res) => {
    res.sendfile(path.join(__dirname, '../public/src/Twitch/TwitchChat/TwitchChat.html'))
  })

  app.get('/Twitch/Player', (req, res) => {
    res.sendfile(path.join(__dirname, '../public/src/Twitch/TwitchPlayer/TwitchPlayer.html'))
  })

  io.sockets.on('connection', (socket) => {
    socket.on('Twitch:new', (channel) => {
      socket.broadcast.emit('Twitch:new', channel)
    })
  })
}

