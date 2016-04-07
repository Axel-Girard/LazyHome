var socket = io();

var off = true;

$('#Shutdown_shutdown').click(function(){    
    shutdown();
});

$('#Shutdown_cancel').click(function(){
    socket.emit('Shutdown:cancel');
});

$('#co_shutdown').submit(function() {
    shutdown();
    return false;
});

socket.on('Shutdown:inprogress', function(start) {
    $("#Shutdown_shutdown").addClass("disabled");
    off = false;
    countdown(start);    
})

socket.on('Shutdown:canceled', function() {
    $("#Shutdown_shutdown").removeClass("disabled");
    clearCountdown();
})

function shutdown(){
    var password = $('#Shutdown_password').val();
    $('#Shutdown_password').val("");
    socket.emit('Shutdown:shutdown', password);
}

function countdown(start){
    $('#countdown').text(''+start);
    if(start > 0 && !off) setTimeout(function() {countdown(start-1);},1000);
}

function clearCountdown(){    
    off = true;
    setTimeout(function() {$('#countdown').text('');},1000);
}
