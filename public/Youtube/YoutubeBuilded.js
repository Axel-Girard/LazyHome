/*globals React:true, ReactDOM:true */

'use strict';

var PlayButton = React.createClass({
  displayName: 'PlayButton',

  handleClick: function handleClick() {
    console.log('clic play');
  },
  render: function render() {
    return React.createElement(
      'a',
      { className: 'waves-effect waves-light btn-large red lighten-3 btn-flat', onClick: this.handleClick },
      React.createElement('i', { className: 'fa fa-play fa-5x' })
    );
  }
});

var PauseButton = React.createClass({
  displayName: 'PauseButton',

  handleClick: function handleClick() {
    console.log('clic pause');
  },
  render: function render() {
    return React.createElement(
      'a',
      { className: 'waves-effect waves-light btn-large red lighten-3 btn-flat', onClick: this.handleClick },
      React.createElement('i', { className: 'fa fa-pause fa-5x' })
    );
  }
});

var PreviousButton = React.createClass({
  displayName: 'PreviousButton',

  handleClick: function handleClick() {
    console.log('clic previous');
  },
  render: function render() {
    return React.createElement(
      'a',
      { className: 'waves-effect waves-light btn-large red lighten-3 btn-flat', onClick: this.handleClick },
      React.createElement('i', { className: 'fa fa-step-backward fa-5x' })
    );
  }
});

var NextButton = React.createClass({
  displayName: 'NextButton',

  handleClick: function handleClick() {
    console.log('clic next');
  },
  render: function render() {
    return React.createElement(
      'a',
      { className: 'waves-effect waves-light btn-large red lighten-3 btn-flat', onClick: this.handleClick },
      React.createElement('i', { className: 'fa fa-step-forward fa-5x' })
    );
  }
});

var BigNextButton = React.createClass({
  displayName: 'BigNextButton',

  handleClick: function handleClick() {
    console.log('clic bigNext');
  },
  render: function render() {
    return React.createElement(
      'a',
      { className: 'waves-effect waves-light btn-large red lighten-3 btn-flat', onClick: this.handleClick },
      React.createElement('i', { className: 'fa fa-arrow-right fa-5x' })
    );
  }
});

var ClearButton = React.createClass({
  displayName: 'ClearButton',

  handleClick: function handleClick() {
    console.log('clic clear');
  },
  render: function render() {
    return React.createElement(
      'a',
      { className: 'waves-effect waves-light btn-large red lighten-3 btn-flat', onClick: this.handleClick },
      React.createElement('i', { className: 'fa fa-trash fa-5x' })
    );
  }
});

var SearchBar = React.createClass({
  displayName: 'SearchBar',

  getInitialState: function getInitialState() {
    return { value: '' };
  },
  handleSubmit: function handleSubmit(event) {
    event.preventDefault();
    console.log('search submit', this.state.value);
  },
  handleChange: function handleChange(event) {
    this.setState({ value: event.target.value });
  },
  render: function render() {
    return React.createElement(
      'form',
      { action: '/', method: 'post', onSubmit: this.handleSubmit },
      React.createElement(
        'div',
        { 'class': 'input-field' },
        React.createElement('input', { id: 'search', type: 'text', className: 'red lighten-3 black-text', value: this.state.value, onChange: this.handleChange, placeholder: 'Search ...' })
      ),
      React.createElement('input', { type: 'submit', hidden: true })
    );
  }
});

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
              { className: 'col s12 black-text center-align', id: 'Title' },
              React.createElement('i', { className: 'fa fa-youtube-play fa-5x red-text' }),
              React.createElement(
                'h1',
                null,
                'Youtube'
              )
            )
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
              React.createElement(PreviousButton, null)
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(PlayButton, null)
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(NextButton, null)
            )
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(ClearButton, null)
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(PauseButton, null)
            ),
            React.createElement(
              'div',
              { className: 'col s3 center-align' },
              React.createElement(BigNextButton, null)
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(YoutubeDoor, null), document.getElementById('youtube'));
