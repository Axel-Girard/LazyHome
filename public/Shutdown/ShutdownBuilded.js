/*globals React:true, ReactDOM:true */

'use strict';

var ShutdownElement = React.createClass({
  displayName: 'ShutdownElement',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'col s6' },
      React.createElement(
        'div',
        { className: 'card blue center white-text waves-effect waves-block waves-light' },
        React.createElement(
          'div',
          { className: 'card-image activator' },
          React.createElement('i', { className: 'fa fa-power-off fa-5x' })
        ),
        React.createElement(
          'div',
          { className: 'card-content activator' },
          ' Power '
        ),
        React.createElement(
          'div',
          { className: 'card-reveal blue blue lighten-5' },
          React.createElement(
            'span',
            { className: 'card-title blue-text' },
            React.createElement('i', { className: 'fa fa-times-circle fa-5x' })
          ),
          React.createElement(
            'form',
            { action: '/', method: 'post', id: 'co_shutdown' },
            React.createElement('input', { id: 'Shutdown_password', type: 'text', className: 'blue white-text' }),
            React.createElement('input', { type: 'submit', hidden: true }),
            React.createElement(
              'a',
              { className: 'waves-effect waves-light btn-large blue', id: 'Shutdown_shutdown' },
              React.createElement(
                'i',
                { className: 'material-icons' },
                'power_settings_new'
              )
            ),
            React.createElement(
              'a',
              { className: 'waves-effect waves-light btn-large blue', id: 'Shutdown_cancel' },
              React.createElement(
                'i',
                { className: 'material-icons right' },
                'loop'
              ),
              'Cancel'
            )
          ),
          React.createElement('span', { className: 'card-title blue-text', id: 'countdown' })
        )
      )
    );
  }
});

if (window.location.href.indexOf('192.168.1') > 0) {
  ReactDOM.render(React.createElement(ShutdownElement, null), document.getElementById('shutdown'));
}
