var React = require('react')
var ReactDOM = require('react-dom')

var Door = require('./src/Components/Door.jsx')
var Youtube = require('./src/Youtube/Youtube.jsx')
var Shutdown = require('./src/Shutdown/Shutdown.jsx')

function hidePage () {
  ReactDOM.render(<div />, document.getElementById('page'))
}

function showYoutube () {
  ReactDOM.render(<Youtube close={hidePage}/>, document.getElementById('page'))
}

function showShutdown () {
  ReactDOM.render(<Shutdown close={hidePage}/>, document.getElementById('page'))
}

// var ShutdownDoor = ()

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Door color={'red'} onClick={showYoutube}><i className='fa fa-youtube-play fa-5x'></i><br/>Youtube</Door>
        <Door color={'blue'} onClick={showShutdown}><i className='fa fa-power-off fa-5x'></i><br/>Power</Door>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('bodyWrapper'))
