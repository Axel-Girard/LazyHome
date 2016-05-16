/*globals io $*/
/* eslint-disable no-unused-vars*/

'use strict'

var socket = io()

socket.emit('Twitch:connection')

socket.on('Twitch:connected', function (channel) {
  if (channel !== null) {
    showPlayer(preparePlayer(channel))
  }
})

socket.on('Twitch:new', function (channel) {
  showPlayer(preparePlayer(channel))
})

function preparePlayer (channel) {
  var element = '<iframe frameborder="0" scrolling="no" id="chat_embed" allowfullscreen="true"'
  element += 'src="http://player.twitch.tv/?channel=' + channel + '" '
  element += '></iframe>'
  return element
}

function showPlayer (element) {
  $('main').empty()
  $('main').append(element)
  bigPlayer()
}

$(window).resize(function () {
  bigPlayer()
})

function bigPlayer () {
  $('#chat_embed').height($(window).innerHeight())
  $('#chat_embed').width($(window).innerWidth())
}

function submitFormPlayer () {
  showPlayer(preparePlayer($('#search').val()))
  $('#search').val('')
  return false
}

