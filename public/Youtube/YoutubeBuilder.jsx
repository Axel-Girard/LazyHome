/*globals React:true, ReactDOM:true, io:true, $:true */

'use strict'

var MESSAGES = {errorUrlFormat: 'Wrong URL Format',
                searchBarPlaceholder: 'Search ...'}

var CHIPS_OUT = 3000

var socket = io()

var timeout
var OriginalIncrement = 1

/* Utils */

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

/* Triggered */

function onClickPlay () {
  socket.emit('Youtube:resume')
}

function onClickPause () {
  socket.emit('Youtube:pause')
}

function onClickPrevious () {
  socket.emit('Youtube:previous')
}

function onClickNext () {
  socket.emit('Youtube:next')
}

function onClickBigNext () {
  socket.emit('Youtube:bigNext')
}

function onClickClear () {
  socket.emit('Youtube:clear')
}

function setVolume (volume) {
  socket.emit('Youtube:volume', volume)
}

function showError (message, duration) {
  clearTimeout(timeout)
  ReactDOM.render(<UniversalError>{message}</UniversalError>, document.getElementById('ErrorRow'))
  timeout = setTimeout(() => ReactDOM.render(<UniversalError />, document.getElementById('ErrorRow')), duration)
}

function onNewUrl (url) {
  var id = videoURL_parser(url)
  if (!id) {
    id = playlistURL_parser(url)
    if (!id) {
      showError(MESSAGES.errorUrlFormat, CHIPS_OUT)
    } else {
      socket.emit('Youtube:add', url)
    }
  } else {
    socket.emit('Youtube:add', url)
  }
}

/* Components */
/* Buttons */

function ControlButton (props) {
  return (
    <a className='waves-effect waves-light btn-large red lighten-3 btn-flat'
      onClick={props.onClick}
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
      onTouchEnd={props.onTouchEnd}
      onTouchStart={props.onTouchStart}>
      {props.children}
    </a>
  )
}

var CloseButton = React.createClass({
  handleClick: function () {
    ReactDOM.render(<YoutubeDoor />, document.getElementById('youtube'))
  },
  render: function () {
    return (
      <i className='fa fa-times fa-3x right-align valign' onClick={this.handleClick}></i>
    ) }
})

/* Special Elements */

var SearchBar = React.createClass({
  getInitialState: function () {
    return {url: ''}
  },
  handleSubmit: function (event) {
    event.preventDefault()
    onNewUrl(this.state.url)
    this.setState({url: ''})
    $(event.target).find('input')[0].blur()
  },
  handleChange: function (event) {
    this.setState({url: event.target.value})
  },
  render: function () {
    return (
      <form action='/' method='post' onSubmit={this.handleSubmit}>
        <div class='input-field'>
          <input id='search' type='text' className='red lighten-3 black-text' value={this.state.url} onChange={this.handleChange} placeholder={MESSAGES.searchBarPlaceholder}/>
        </div>
        <input type='submit' hidden/>
      </form>
    ) }
})

function UniversalError (props) {
  var text = props.children ? <div className='chip red white-text'>{props.children}<i className='material-icons'>close</i></div> : <div></div>
  return text
}

/* Cards */

var YoutubeDoor = React.createClass({
  handleClick: () => {
    ReactDOM.render(<YoutubePage />, document.getElementById('youtube'))
  },
  render: function () {
    return (
      <div onClick={this.handleClick} className='col s6'>
        <div className='card red accent-4 center white-text waves-effect waves-block waves-light' id='YoutubeActivator'>
          <div>
            <i className='fa fa-youtube-play fa-5x'></i><br/>Youtube
          </div>
        </div>
      </div>
    ) }
})

var YoutubePage = React.createClass({
  getInitialState: function () {
    return {volume: 50,
            duration: 0,
            increment: OriginalIncrement,
            down: false}
  },
  autoInc: function (inc) {
    setTimeout(() => {
      if (this.state.down) {
        this.incVolume(inc)
        this.setState({duration: this.state.duration + 1})
        if (this.state.increment < OriginalIncrement * 10 && this.state.volume % 5 === 0) {
          this.setState({increment: 5 * Math.ceil(this.state.duration / 5)})
        }
        this.autoInc(inc)
      }
    }, 500)
  },
  incVolume: function (inc) {
    var newVolume = inc ? Math.min(100, this.state.volume + this.state.increment) : Math.max(0, this.state.volume - this.state.increment)
    this.setState({volume: newVolume})
    setVolume(newVolume)
  },
  onMouseDownInc: function () {
    this.setState({down: true})
    this.incVolume(true)
    this.autoInc(true)
  },
  onMouseDownDec: function () {
    this.setState({down: true})
    this.incVolume(false)
    this.autoInc(false)
  },
  onMouseUp: function () {
    this.setState({duration: 0,
                   increment: OriginalIncrement,
                   down: false})
  },
  render: function () {
    return (
      <div className='col s12'>
        <div className='card red lighten-5' id='YoutubeControls'>
          <div className='container'>
            <div className='row'>
              <div className='col s11 black-text center-align' id='Title'>
                <i className='fa fa-youtube-play fa-5x red-text'></i><h1>Youtube</h1>
              </div>
              <div className='col s1 black-text right-align'>
                <CloseButton />
              </div>
            </div>
            <div className='row'>
              <div className='col s12' id='ErrorRow'>
              </div>
            </div>
            <div className='row'>
              <div className='col s12'>
                <SearchBar />
              </div>
            </div>
            <div className='row'>
              <div className='col s3 center-align'>
                <ControlButton onClick={onClickPrevious}><i className='fa fa-step-backward fa-5x'></i></ControlButton>
              </div>
              <div className='col s3 center-align'>
                <ControlButton onClick={onClickPlay}><i className='fa fa-play fa-5x'></i></ControlButton>
              </div>
              <div className='col s3 center-align'>
                <ControlButton onClick={onClickNext}><i className='fa fa-step-forward fa-5x'></i></ControlButton>
              </div>
              <div className='col s3 center-align'>
                <ControlButton onTouchEnd={this.onMouseUp} onMouseUp={this.onMouseUp} onTouchStart={this.onMouseDownInc} onMouseDown={this.onMouseDownInc}><i className='fa fa-plus fa-5x'></i></ControlButton>
              </div>
            </div>
            <div className='row'>
              <div className='col s3 center-align'>
                <ControlButton onClick={onClickClear}><i className='fa fa-trash fa-5x'></i></ControlButton>
              </div>
              <div className='col s3 center-align'>
                <ControlButton onClick={onClickPause}><i className='fa fa-pause fa-5x'></i></ControlButton>
              </div>
              <div className='col s3 center-align'>
                <ControlButton onClick={onClickBigNext}><i className='fa fa-arrow-right fa-5x'></i></ControlButton>
              </div>
              <div className='col s3 center-align'>
                <span id='VolumeText'>{this.state.volume}</span>
              </div>
            </div>
            <div className='row'>
              <div className='col s3 offset-s3 center-align'>
                <a className='waves-effect waves-light btn-large red lighten-3 btn-flat' href='/Youtube' target='_blank'>
                  <b>Watch</b>
                </a>
              </div>
              <div className='col s3 offset-s3 center-align'>
                <ControlButton onTouchEnd={this.onMouseUp} onMouseUp={this.onMouseUp} onTouchStart={this.onMouseDownDec} onMouseDown={this.onMouseDownDec}><i className='fa fa-minus fa-5x'></i></ControlButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

ReactDOM.render(<YoutubeDoor />, document.getElementById('youtube'))
