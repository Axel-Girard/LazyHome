'use strict'

module.exports = function (app, io, path) {
  app.get('/Youtube', (req, res) => {
    res.sendfile(path.join(__dirname, '../public/src/Youtube/YoutubeWatch/YoutubeWatch.html'))
  })

  io.sockets.on('connection', (socket) => {
    socket.on('Youtube:add', (data) => {
      socket.broadcast.emit('Youtube:add', data)
    })
    socket.on('Youtube:pause', () => {
      socket.broadcast.emit('Youtube:pause')
    })
    socket.on('Youtube:resume', () => {
      socket.broadcast.emit('Youtube:resume')
    })
    socket.on('Youtube:clear', () => {
      socket.broadcast.emit('Youtube:clear')
    })
    socket.on('Youtube:volume', (volume) => {
      socket.broadcast.emit('Youtube:volume', volume)
    })
    socket.on('Youtube:next', () => {
      socket.broadcast.emit('Youtube:next')
    })
    socket.on('Youtube:previous', () => {
      socket.broadcast.emit('Youtube:previous')
    })
    socket.on('Youtube:bigNext', () => {
      socket.broadcast.emit('Youtube:bigNext')
    })
  })
}

