/* globals io $*/
/* eslint-disable no-unused-vars*/

'use strict'

var socket = io()

socket.on('Twitch:new', function (channel) {
  console.log(channel)
  showChat(prepareChat(channel))
})

function prepareChat (channel) {
  var element = '<iframe frameborder="0" scrolling="no" id="chat_embed"'
  element += 'src="http://www.twitch.tv/' + channel + '/chat" '
  element += '></iframe>'
  return element
}

function showChat (element) {
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

function submitFormChat () {
  showChat(prepareChat($('#search').val()))
  $('#search').val('')
  return false
}
