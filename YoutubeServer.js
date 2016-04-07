'use strict';

module.exports = function(app,io) {
    
    app.get('/Youtube', (req, res) => {
        res.sendfile(__dirname + '/public/Youtube/YoutubeWatch/YoutubeWatch.html');
    });

    io.sockets.on('connection', (socket) => {

        socket.on('Youtube:play', (data) => {
            socket.broadcast.emit('Youtube:play',data);
        });

        socket.on('Youtube:pause', () => {
            socket.broadcast.emit('Youtube:pause');
        });

        socket.on('Youtube:resume', () => {
            socket.broadcast.emit('Youtube:resume');
        });

        socket.on('Youtube:stop', () => {
            socket.broadcast.emit('Youtube:stop');
        });        

        socket.on('Youtube:volume', (length) => {
            socket.broadcast.emit('Youtube:volume',length);
        });

        socket.on('Youtube:next', () => {
            socket.broadcast.emit('Youtube:next');
        });

        socket.on('Youtube:previous', () => {
            socket.broadcast.emit('Youtube:previous');
        });

        socket.on('Youtube:skipPlaylist', () => {
            socket.broadcast.emit('Youtube:skipPlaylist');
        });

    });
    
};

