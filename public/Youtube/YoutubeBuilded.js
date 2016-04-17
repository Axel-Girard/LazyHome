/*globals React:true, ReactDOM:true, io:true, $:true */

'use strict';

var MESSAGES = { errorUrlFormat: 'Wrong URL Format',
  searchBarPlaceholder: 'Search ...' };

var CHIPS_OUT = 3000;

var socket = io();

var timeout;
var OriginalIncrement = 1;

/* Utils */

function videoURL_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

function playlistURL_parser(url) {
  var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[2] ? match[2] : false;
}

/* Triggered */

function onClickPlay() {
  socket.emit('Youtube:resume');
}

function onClickPause() {
  socket.emit('Youtube:pause');
}

function onClickPrevious() {
  socket.emit('Youtube:previous');
}

function onClickNext() {
  socket.emit('Youtube:next');
}

function onClickBigNext() {
  socket.emit('Youtube:bigNext');
}

function onClickClear() {
  socket.emit('Youtube:clear');
}

function setVolume(volume) {
  socket.emit('Youtube:volume', volume);
}

function showError(message, duration) {
  clearTimeout(timeout);
  ReactDOM.render(React.createElement(
    UniversalError,
    null,
    message
  ), document.getElementById('ErrorRow'));
  timeout = setTimeout(function () {
    return ReactDOM.render(React.createElement(UniversalError, null), document.getElementById('ErrorRow'));
  }, duration);
}

function onNewUrl(url) {
  var id = videoURL_parser(url);
  if (!id) {
    id = playlistURL_parser(url);
    if (!id) {
      showError(MESSAGES.errorUrlFormat, CHIPS_OUT);
    } else {
      socket.emit('Youtube:add', url);
    }
  } else {
    socket.emit('Youtube:add', url);
  }
}

/* Components */
/* Buttons */

function ControlButton(props) {
  return React.createElement(
    'a',
    { className: 'waves-effect waves-light btn-large red lighten-3 btn-flat',
      onClick: props.onClick,
      onMouseUp: props.onMouseUp,
      onMouseDown: props.onMouseDown,
      onTouchEnd: props.onTouchEnd,
      onTouchStart: props.onTouchStart },
    props.children
  );
}

var CloseButton = React.createClass({
  displayName: 'CloseButton',

  handleClick: function handleClick() {
    ReactDOM.render(React.createElement(YoutubeDoor, null), document.getElementById('youtube'));
  },
  render: function render() {
    return React.createElement('i', { className: 'fa fa-times fa-3x right-align valign', onClick: this.handleClick });
  }
});

/* Special Elements */

var SearchBar = React.createClass({
  displayName: 'SearchBar',

  getInitialState: function getInitialState() {
    return { url: '' };
  },
  handleSubmit: function handleSubmit(event) {
    event.preventDefault();
    onNewUrl(this.state.url);
    this.setState({ url: '' });
    $(event.target).find('input')[0].blur();
  },
  handleChange: function handleChange(event) {
    this.setState({ url: event.target.value });
  },
  render: function render() {
    return React.createElement(
      'form',
      { action: '/', method: 'post', onSubmit: this.handleSubmit },
      React.createElement(
        'div',
        { 'class': 'input-field' },
        React.createElement('input', { id: 'search', type: 'text', className: 'red lighten-3 black-text', value: this.state.url, onChange: this.handleChange, placeholder: MESSAGES.searchBarPlaceholder })
      ),
      React.createElement('input', { type: 'submit', hidden: true })
    );
  }
});

function UniversalError(props) {
  var text = props.children ? React.createElement(
    'div',
    { className: 'chip red white-text' },
    props.children,
    React.createElement(
      'i',
      { className: 'material-icons' },
      'close'
    )
  ) : React.createElement('div', null);
  return text;
}

/* Cards */

var YoutubeDoor = React.createClass({
  displayName: 'YoutubeDoor',

  handleClick: function handleClick() {
    ReactDOM.render(React.createElement(YoutubePage, null), document.getElementById('youtube'));
  },
  render: function render() {
    return React.createElement(
      'div',
      { onClick: this.handleClick, className: 'col s6' },
      React.createElement(
        'div',
        { className: 'card red accent-4 center white-text waves-effect waves-block waves-light', id: 'YoutubeActivator' },
        React.createElement(
          'div',
          null,
          React.createElement('i', { className: 'fa fa-youtube-play fa-5x' }),
          React.createElement('br', null),
          'Youtube'
        )
      )
    );
  }
});

var YoutubePage = React.createClass({
  displayName: 'YoutubePage',

  getInitialState: function getInitialState() {
    return { volume: 50,
      duration: 0,
      increment: OriginalIncrement,
      down: false };
  },
  autoInc: function autoInc(inc) {
    var _this = this;

    setTimeout(function () {
      if (_this.state.down) {
        _this.incVolume(inc);
        _this.setState({ duration: _this.state.duration + 1 });
        if (_this.state.increment < OriginalIncrement * 10 && _this.state.volume % 5 === 0) {
          _this.setState({ increment: 5 * Math.ceil(_this.state.duration / 5) });
        }
        _this.autoInc(inc);
      }
    }, 500);
  },
  incVolume: function incVolume(inc) {
    var newVolume = inc ? Math.min(100, this.state.volume + this.state.increment) : Math.max(0, this.state.volume - this.state.increment);
    this.setState({ volume: newVolume });
    setVolume(newVolume);
  },
  onMouseDownInc: function onMouseDownInc() {
    this.setState({ down: true });
    this.incVolume(true);
    this.autoInc(true);
  },
  onMouseDownDec: function onMouseDownDec() {
    this.setState({ down: true });
    this.incVolume(false);
    this.autoInc(false);
  },
  onMouseUp: function onMouseUp() {
    this.setState({ duration: 0,
      increment: OriginalIncrement,
      down: false });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'col s12' },
      React.createElement(
        'div',
        { className: 'card red lighten-5', id: 'YoutubeControls' },
        React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col s11 black-text center-align', id: 'Title' },
              React.createElement('i', { className: 'fa fa-youtube-play fa-5x red-text' }),
              React.createElement(
                'h1',
                null,
                'Youtube'
              )
            ),
            React.createElement(
              'div',
              { className: 'col s1 black-text right-align' },
              React.createElement(CloseButton, null)
            )
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement('div', { className: 'col s12', id: 'ErrorRow' })
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col s12' },
              React.createElement(SearchBar, null)
            )
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(
                ControlButton,
                { onClick: onClickPrevious },
                React.createElement('i', { className: 'fa fa-step-backward fa-5x' })
              )
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(
                ControlButton,
                { onClick: onClickPlay },
                React.createElement('i', { className: 'fa fa-play fa-5x' })
              )
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(
                ControlButton,
                { onClick: onClickNext },
                React.createElement('i', { className: 'fa fa-step-forward fa-5x' })
              )
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(
                ControlButton,
                { onTouchEnd: this.onMouseUp, onMouseUp: this.onMouseUp, onTouchStart: this.onMouseDownInc, onMouseDown: this.onMouseDownInc },
                React.createElement('i', { className: 'fa fa-plus fa-5x' })
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(
                ControlButton,
                { onClick: onClickClear },
                React.createElement('i', { className: 'fa fa-trash fa-5x' })
              )
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(
                ControlButton,
                { onClick: onClickPause },
                React.createElement('i', { className: 'fa fa-pause fa-5x' })
              )
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(
                ControlButton,
                { onClick: onClickBigNext },
                React.createElement('i', { className: 'fa fa-arrow-right fa-5x' })
              )
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(
                'span',
                { id: 'VolumeText' },
                this.state.volume
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col s3 offset-s3 center-align' },
              React.createElement(
                'a',
                { className: 'waves-effect waves-light btn-large red lighten-3 btn-flat', href: '/Youtube', target: '_blank' },
                React.createElement(
                  'b',
                  null,
                  'Watch'
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'col s3 offset-s3 center-align' },
              React.createElement(
                ControlButton,
                { onTouchEnd: this.onMouseUp, onMouseUp: this.onMouseUp, onTouchStart: this.onMouseDownDec, onMouseDown: this.onMouseDownDec },
                React.createElement('i', { className: 'fa fa-minus fa-5x' })
              )
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(YoutubeDoor, null), document.getElementById('youtube'));
