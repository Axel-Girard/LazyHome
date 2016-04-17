/*globals React, $ */
/*eslint-disable no-unused-vars*/

'use strict';

/* props : color, onClick, children */

function ControlButton(props) {
  var classes = 'waves-effect waves-light btn-large lighten-3 btn-flat ' + props.color;
  return React.createElement(
    'a',
    { className: classes, onClick: props.onClick },
    props.children
  );
}

/* props : onClick */
function CloseButton(props) {
  return React.createElement('i', { className: 'fa fa-times fa-3x right-align valign', onClick: props.onClick });
}

/* props : color, children */
function UniversalError(props) {
  var classes = 'chip white-text ' + props.color;
  var text = props.children ? React.createElement(
    'div',
    { className: classes },
    props.children,
    React.createElement(
      'i',
      { className: 'material-icons' },
      'close'
    )
  ) : React.createElement('div', null);
  return text;
}

/* props : color, placeholder, onSubmit */
var SearchBar = React.createClass({
  displayName: 'SearchBar',

  getInitialState: function getInitialState() {
    return { value: '' };
  },
  handleSubmit: function handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
    $(event.target).find('input')[0].blur();
  },
  handleChange: function handleChange(event) {
    this.setState({ value: event.target.value });
  },
  render: function render() {
    var classes = 'lighten-3 black-text ' + this.props.color;
    return React.createElement(
      'form',
      { action: '/', method: 'post', onSubmit: this.handleSubmit },
      React.createElement(
        'div',
        { 'class': 'input-field' },
        React.createElement('input', { id: 'search', type: 'text', className: classes, value: this.state.value, onChange: this.handleChange, placeholder: this.props.placeholder })
      ),
      React.createElement('input', { type: 'submit', hidden: true })
    );
  }
});

/* props : color, onClick, children */
function Door(props) {
  var classes = 'card accent-4 center white-text waves-effect waves-block waves-light activator ' + props.color;
  return React.createElement(
    'div',
    { onClick: props.onClick, className: 'col s6' },
    React.createElement(
      'div',
      { className: classes },
      props.children
    )
  );
}
