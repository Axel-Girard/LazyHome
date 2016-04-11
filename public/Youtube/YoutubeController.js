/*globals $:true, io:true, Materialize:true */

var socket = io()

var paused = false

$('#Youtube_volume').on('input change', function () {
  socket.emit('Youtube:volume', this.value)
})

$('#Youtube_pause').click(function () {
  paused = true
  socket.emit('Youtube:pause')
})

$('#Youtube_next').click(function () {
  socket.emit('Youtube:next')
})

$('#Youtube_previous').click(function () {
  socket.emit('Youtube:previous')
})

$('#Youtube_skipPlaylist').click(function () {
  socket.emit('Youtube:skipPlaylist')
})

$('#Youtube_play').click(function () {
  if (paused) {
    socket.emit('Youtube:resume')
  } else {
    send()
  }
})

$('#Youtube_stop').click(function () {
  socket.emit('Youtube:stop')
})

$('#Youtube_form').submit(function () {
  send()
  return false
})

function send () {
  var url = $('#Youtube_url').val()
  var id = videoURL_parser(url)
  $('#Youtube_url').val('')
  if (!id) {
    id = playlistURL_parser(url)
    if (!id) {
      Materialize.toast('Wrong URL', 4000)
    } else {
      socket.emit('Youtube:play', url)
    }
  } else {
    socket.emit('Youtube:play', url)
  }
}

function videoURL_parser (url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  var match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

function playlistURL_parser (url) {
  var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/
  var match = url.match(regExp)
  return (match && match[2]) ? match[2] : false
}
