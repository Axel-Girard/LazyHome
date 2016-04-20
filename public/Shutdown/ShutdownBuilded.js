'use strict';

/*globals React, ReactDOM, io, Door, CloseButton, SearchBar, ControlButton */

(function Shutdown() {
  'use strict';

  var MESSAGES = { errorUrlFormat: 'Wrong URL Format',
    searchBarPlaceholder: 'Password ...',
    title: 'Power',
    logo: 'fa fa-power-off fa-5x' };
  var COLOR = 'blue';

  var socket = io();

  var ShutdownDoor = React.createElement(
    Door,
    { color: COLOR, onClick: showShutdownPage },
    React.createElement('i', { className: MESSAGES.logo }),
    React.createElement('br', null),
    'Power'
  );

  function hideShutdownPage() {
    ReactDOM.render(React.createElement('div', null), document.getElementById('page'));
    ReactDOM.render(ShutdownDoor, document.getElementById('shutdown'));
  }

  function showShutdownPage() {
    ReactDOM.render(React.createElement(ShutdownPage, null), document.getElementById('page'));
    ReactDOM.render(React.createElement('div', null), document.getElementById('shutdown'));
  }

  function startShutdown(value) {
    socket.emit('Shutdown:shutdown', value);
  }

  function cancelShutdown() {
    socket.emit('Shutdown:cancel');
  }

  var ShutdownPage = React.createClass({
    displayName: 'ShutdownPage',

    render: function render() {
      var cardClasses = 'card lighten-5 page ' + COLOR;
      var logoClasses = MESSAGES.logo + ' ' + COLOR + '-text';
      return React.createElement(
        'div',
        { className: 'col s12' },
        React.createElement(
          'div',
          { className: cardClasses, id: 'ShutdownControls' },
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
                React.createElement(CloseButton, { onClick: hideShutdownPage })
              )
            ),
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement('div', { className: 'col s12', id: 'ShutdownErrorRow' })
            ),
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col s12' },
                React.createElement(SearchBar, { color: COLOR, placeholder: MESSAGES.searchBarPlaceholder, onSubmit: startShutdown })
              )
            ),
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col s12 center-align' },
                React.createElement(
                  ControlButton,
                  { color: COLOR, onClick: cancelShutdown },
                  'Cancel'
                )
              )
            )
          )
        )
      );
    }
  });

  if (window.location.href.indexOf('192.168.1') > 0) {
    ReactDOM.render(ShutdownDoor, document.getElementById('shutdown'));
  }
})();
