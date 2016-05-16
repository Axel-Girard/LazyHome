/* globals $ */

var React = require('react')
var ReactDOM = require('react-dom')
var io = require('socket.io-client')

var Door = require('../Components/Door.jsx')

var socket = io()

const COL = 's6'

$(window).resize(function () {
  bigPlayer()
})

function bigPlayer () {
  $('#chat_embed').height($(window).innerHeight())
  $('#chat_embed').width($(window).innerWidth())
}

var TwitchView = React.createClass({
  getInitialState: function () {
    return {chat: false,
            player: false,
            iframe: ''
           }
  },
  componentDidMount () {
    socket.on('Twitch:connected', this.processElement)
    socket.on('Twitch:new', this.processElement)
  },
  processElement: function (channel) {
    if (channel !== null && channel !== '') {
      if (this.state.chat) {
        this.getChat(channel)
      } else if (this.state.player) {
        this.getPlayer(channel)
      }
    }
  },
  getPlayer: function (channel) {
    var element = '<iframe frameborder="0" scrolling="no" id="chat_embed" allowfullscreen="true"'
    element += 'src="http://player.twitch.tv/?channel=' + channel + '" '
    element += 'style="height: ' + $(window).innerHeight() + 'px; width: ' + $(window).innerWidth() + 'px;"></iframe>'
    this.setState({iframe: element})
  },

  getChat: function (channel) {
    var element = '<iframe frameborder="0" scrolling="no" id="chat_embed"'
    element += 'src="http://www.twitch.tv/' + channel + '/chat" '
    element += 'style="height: ' + $(window).innerHeight() + 'px; width: ' + $(window).innerWidth() + 'px;"></iframe>'
    this.setState({iframe: element})
  },
  clickChat: function () {
    this.setState({chat: true, player: false})
    socket.emit('Twitch:connection')
  },
  clickPlayer: function () {
    this.setState({chat: false, player: true})
    socket.emit('Twitch:connection')
  },
  getIframe: function () {
    return { __html: this.state.iframe }
  },
  render: function () {
    return (
      <div>
        <div dangerouslySetInnerHTML={this.getIframe()}></div>
        <div className='row'>
          <Door color={'purple'} col={COL} onClick={this.clickPlayer}>Player</Door>
          <Door color={'purple'} col={COL} onClick={this.clickChat}>Chat</Door>
        </div>
      </div>
    )
  }
})

ReactDOM.render(<TwitchView />, document.getElementById('bodyWrapper'))
