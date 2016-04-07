'use strict';

var exec = require('child_process').exec;

module.exports = function (app, io, config) {

    io.sockets.on('connection', (socket) => {

        if (socket.client.request.headers.host.indexOf('192.168.1') > -1) { socket.join('locals'); }

        socket.on('Shutdown:cancel',() => {
            cancel(socket);
        });

        socket.on('Shutdown:shutdown', (password) => {
            if (socket.rooms['locals'] !== undefined) { shutdown(password,socket); }
        });

    });

    function cancel(socket){
        exec('shutdown -a', (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            if (error === null) {
                socket.broadcast.emit('Shutdown:canceled');
                socket.emit('Shutdown:canceled');
            }
        });
    }

    function shutdown(password,socket){
        var timer = config['Shutdown_timer'];
        var cmd = 'shutdown -s -f -t ' + timer;
        if(password == config['Shutdown_mdp']){
            exec(cmd, (error, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                if (error === null) {
                    socket.broadcast.emit('Shutdown:inprogress',timer);
                    socket.emit('Shutdown:inprogress',timer);
                }
            });
        }
    }
}
