var React = require('react')
var ReactDOM = require('react-dom')

var Door = require('./src/Components/Door.jsx')
var Youtube = require('./src/Youtube/Youtube.jsx')
var Shutdown = require('./src/Shutdown/Shutdown.jsx')
var Twitch = require('./src/Twitch/TwitchControls.jsx')

const COL = 's4'

function hidePage () {
  ReactDOM.render(<div />, document.getElementById('page'))
}

function showYoutube () {
  ReactDOM.render(<Youtube close={hidePage}/>, document.getElementById('page'))
}

function showShutdown () {
  ReactDOM.render(<Shutdown close={hidePage}/>, document.getElementById('page'))
}

function showTwitch () {
  ReactDOM.render(<Twitch close={hidePage}/>, document.getElementById('page'))
}

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Door color={'red'} col={COL} onClick={showYoutube}><i className='fa fa-youtube-play fa-4x'></i><br/>Youtube</Door>
        <Door color={'blue'} col={COL} onClick={showShutdown}><i className='fa fa-power-off fa-4x'></i><br/>Power</Door>
        <Door color={'purple'} col={COL} onClick={showTwitch}><i className='fa fa-twitch fa-4x'></i><br/>Twitch</Door>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('bodyWrapper'))
