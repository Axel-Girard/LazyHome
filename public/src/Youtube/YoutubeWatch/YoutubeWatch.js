/* globals io YT $ */
/* eslint-disable no-unused-vars */

'use strict'

var socket = io()

var player
var state = {ended: false, playing: false, paused: false, video: false, playlist: false, title: '', time: 0}

var isLast = false
var urls = []
var previousURL = []

// YT PLAYER

var tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// EVENTS

socket.on('Youtube:add', function (url) {
  if (state.playing) {
    urls.push(url)
  } else {
    play(url)
  }
})

socket.on('Youtube:resume', function (time) {
  player.playVideo()
})

socket.on('Youtube:clear', function () {
  stopVideo()
  urls = []
  previousURL = []
})

socket.on('Youtube:volume', function (volume) {
  player.setVolume(volume)
})

socket.on('Youtube:pause', function () {
  player.pauseVideo()
})

socket.on('Youtube:next', function () {
  next(true)
})

socket.on('Youtube:previous', function () {
  previous()
})

socket.on('Youtube:bigNext', function () {
  nextVideo()
})

$(window).resize(function () {
  bigPlayer()
})

// FUNCTIONS

function onYouTubeIframeAPIReady () {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  })
  smallPlayer()
}

function onPlayerReady (event) {
  event.target.playVideo()
}

function changeState (ended, playing, paused, video, playlist) {
  state.ended = ended
  state.playing = playing
  state.paused = paused
  state.video = video
  state.playlist = playlist
  if (player.getVideoData() !== undefined) { state.title = player.getVideoData().title }
  if (player.getCurrentTime() !== undefined) { state.time = player.getCurrentTime() }
}

function onPlayerStateChange (event) {
  if (event.data === YT.PlayerState.ENDED) {
    changeState(true, false, false, state.video, state.playlist)
    next(false)
  } else if (event.data === YT.PlayerState.PLAYING) {
    changeState(false, true, false, state.video, state.playlist)
    if (state.playlist) { isLast = player.getPlaylistIndex() >= (player.getPlaylist().length - 1) }
  } else if (event.data === YT.PlayerState.PAUSED) {
    changeState(false, false, true, state.video, state.playlist)
  }
}

function stopVideo () {
  player.stopVideo()
  smallPlayer()
  changeState(true, false, false, false, false)
}

function smallPlayer () {
  player.setSize(0, 0)
}

function bigPlayer () {
  player.setSize($(window).innerWidth(), $(window).innerHeight())
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

function play (url) {
  bigPlayer()
  previousURL.push(url)
  var idVideo = videoURL_parser(url)
  var idPlaylist = playlistURL_parser(url)
  if (idVideo) {
    launchVideo(idVideo)
  } else if (idPlaylist) {
    launchPlaylist(idPlaylist)
  } else {
    stopVideo()
  }
}

function launchVideo (id) {
  player.loadVideoById(id)
  changeState(true, true, false, true, false)
}

function launchPlaylist (id) {
  player.loadPlaylist({list: id})
  changeState(true, true, false, false, true)
}

function previous () {
  if (state.playlist) {
    player.previousVideo()
  } else {
    var actual = previousURL.pop()
    var previous = previousURL.pop()
    if (actual !== undefined) { urls.unshift(actual) }
    if (previous !== undefined) { urls.unshift(previous) }
    next(false)
  }
}

function next (triggered) {
  if (state.playlist) {
    nextPlaylist(triggered)
  } else {
    nextVideo()
  }
}

function nextPlaylist (triggered) {
  if (!isLast && triggered) {
    player.nextVideo()
  } else if (isLast) {
    nextVideo()
  }
}

function nextVideo () {
  if (urls.length > 0) {
    play(urls[0])
    urls.splice(0, 1)
  } else {
    stopVideo()
  }
}
