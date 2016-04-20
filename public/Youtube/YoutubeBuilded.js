'use strict';

/*globals React, ReactDOM, io, Door, UniversalError, CloseButton, SearchBar, ControlButton */

(function Youtube() {
  'use strict';

  var MESSAGES = { errorUrlFormat: 'Wrong URL Format',
    searchBarPlaceholder: 'Search ...',
    title: 'Youtube',
    logo: 'fa fa-youtube-play fa-5x' };
  var COLOR = 'red';
  var CHIPS_OUT = 3000;

  var socket = io();
  var timeout, timeoutClick;
  var OriginalIncrement = 1;

  var YoutubeDoor = React.createElement(
    Door,
    { color: COLOR, onClick: showYoutubePage },
    React.createElement('i', { className: MESSAGES.logo }),
    React.createElement('br', null),
    'Youtube'
  );

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
    ), document.getElementById('YoutubeErrorRow'));
    timeout = setTimeout(function () {
      return ReactDOM.render(React.createElement('div', null), document.getElementById('YoutubeErrorRow'));
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

  function hideYoutubePage() {
    ReactDOM.render(React.createElement('div', null), document.getElementById('page'));
    ReactDOM.render(YoutubeDoor, document.getElementById('youtube'));
  }

  function showYoutubePage() {
    ReactDOM.render(React.createElement(YoutubePage, null), document.getElementById('page'));
    ReactDOM.render(React.createElement('div', null), document.getElementById('youtube'));
  }

  /* Cards */

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

      if (this.state.down) {
        this.incVolume(inc);
        this.setState({ duration: this.state.duration + 1 });
        if (this.state.increment < OriginalIncrement * 10 && this.state.volume % 5 === 0) {
          this.setState({ increment: 5 * Math.ceil(this.state.duration / 5) });
        }
        timeoutClick = setTimeout(function () {
          _this.autoInc(inc);
        }, 500);
      }
    },
    incVolume: function incVolume(inc) {
      var newVolume = inc ? Math.min(100, this.state.volume + this.state.increment) : Math.max(0, this.state.volume - this.state.increment);
      this.setState({ volume: newVolume });
      setVolume(newVolume);
    },
    onMouseDownInc: function onMouseDownInc() {
      var _this2 = this;

      this.setState({ down: true });
      setTimeout(function () {
        _this2.autoInc(true);
      }, 1);
    },
    onMouseDownDec: function onMouseDownDec() {
      var _this3 = this;

      this.setState({ down: true });
      setTimeout(function () {
        _this3.autoInc(false);
      }, 1);
    },
    onTouchStartInc: function onTouchStartInc() {
      var _this4 = this;

      this.setState({ down: true });
      setTimeout(function () {
        _this4.autoInc(true);
      }, 1);
    },
    onTouchStartDec: function onTouchStartDec() {
      var _this5 = this;

      this.setState({ down: true });
      setTimeout(function () {
        _this5.autoInc(false);
      }, 1);
    },
    onMouseUp: function onMouseUp() {
      clearTimeout(timeoutClick);
      this.setState({ duration: 0,
        increment: OriginalIncrement,
        down: false });
    },
    render: function render() {
      var cardClasses = 'card lighten-5 page ' + COLOR;
      var logoClasses = MESSAGES.logo + ' ' + COLOR + '-text';
      return React.createElement(
        'div',
        { className: 'col s12' },
        React.createElement(
          'div',
          { className: cardClasses, id: 'YoutubeControls' },
          React.createElement(
            'div',
            { className: 'container' },
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col s11 black-text center-align', id: 'Title' },
                React.createElement('i', { className: logoClasses }),
                React.createElement(
                  'h1',
                  null,
                  MESSAGES.title
                )
              ),
              React.createElement(
                'div',
                { className: 'col s1 black-text right-align' },
                React.createElement(CloseButton, { onClick: hideYoutubePage })
              )
            ),
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement('div', { className: 'col s12', id: 'YoutubeErrorRow' })
            ),
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col s12' },
                React.createElement(SearchBar, { color: COLOR, placeholder: MESSAGES.searchBarPlaceholder, onSubmit: onNewUrl })
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
                  { color: COLOR, onClick: onClickPrevious },
                  React.createElement('i', { className: 'fa fa-step-backward fa-5x' })
                )
              ),
              React.createElement(
                'div',
                { className: 'col s3 center-align' },
                React.createElement(
                  ControlButton,
                  { color: COLOR, onClick: onClickPlay },
                  React.createElement('i', { className: 'fa fa-play fa-5x' })
                )
              ),
              React.createElement(
                'div',
                { className: 'col s3 center-align' },
                React.createElement(
                  ControlButton,
                  { color: COLOR, onClick: onClickNext },
                  React.createElement('i', { className: 'fa fa-step-forward fa-5x' })
                )
              ),
              React.createElement(
                'div',
                { className: 'col s3 center-align' },
                React.createElement(
                  ControlButton,
                  { color: COLOR, onTouchEnd: this.onMouseUp, onMouseUp: this.onMouseUp,
                    onTouchStart: this.onTouchStartInc, onMouseDown: this.onMouseDownInc },
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
                  { color: COLOR, onClick: onClickClear },
                  React.createElement('i', { className: 'fa fa-trash fa-5x' })
                )
              ),
              React.createElement(
                'div',
                { className: 'col s3 center-align' },
                React.createElement(
                  ControlButton,
                  { color: COLOR, onClick: onClickPause },
                  React.createElement('i', { className: 'fa fa-pause fa-5x' })
                )
              ),
              React.createElement(
                'div',
                { className: 'col s3 center-align' },
                React.createElement(
                  ControlButton,
                  { color: COLOR, onClick: onClickBigNext },
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
                  { color: COLOR, onTouchEnd: this.onMouseUp, onMouseUp: this.onMouseUp,
                    onTouchStart: this.onTouchStartDec, onMouseDown: this.onMouseDownDec },
                  React.createElement('i', { className: 'fa fa-minus fa-5x' })
                )
              )
            )
          )
        )
      );
    }
  });

  ReactDOM.render(YoutubeDoor, document.getElementById('youtube'));
})();
