/*globals React, $ */
/*eslint-disable no-unused-vars*/

'use strict'

/* props : color, onClick, children */
var ControlButton = React.createClass({
  render: function () {
    var classes = 'waves-effect waves-light btn-large lighten-3 btn-flat ' + this.props.color
    return (
      <a className={classes} onClick={this.props.onClick} onTouchEnd={this.props.onTouchEnd} onMouseUp={this.props.onMouseUp}
        onTouchStart={this.props.onTouchStart} onMouseDown={this.props.onMouseDown}>
        {this.props.children}
      </a>
    )
  }
})

/* props : onClick */
var CloseButton = React.createClass({
  render: function () {
    return (
      <i className='fa fa-times fa-3x right-align valign' onClick={this.props.onClick}></i>
    )
  }
})

/* props : color, children */
var UniversalError = React.createClass({
  render: function () {
    var classes = 'chip white-text ' + this.props.color
    var text = this.props.children ? <div className={classes}>{this.props.children}<i className='material-icons'>close</i></div> : <div></div>
    return text
  }
})

/* props : color, placeholder, onSubmit */
var SearchBar = React.createClass({
  getInitialState: function () {
    return {value: ''}
  },
  handleSubmit: function (event) {
    event.preventDefault()
    this.props.onSubmit(this.state.value)
    this.setState({value: ''})
    $(event.target).find('input')[0].blur()
  },
  handleChange: function (event) {
    this.setState({value: event.target.value})
  },
  render: function () {
    var classes = 'lighten-3 black-text ' + this.props.color
    return (
      <form action='/' method='post' onSubmit={this.handleSubmit}>
        <div class='input-field'>
          <input id='search' type='text' className={classes} value={this.state.value} onChange={this.handleChange} placeholder={this.props.placeholder}/>
        </div>
        <input type='submit' hidden/>
      </form>
    ) }
})

/* props : color, onClick, children */
var Door = React.createClass({
  render: function () {
    var classes = 'card accent-4 center white-text waves-effect waves-block waves-light activator ' + this.props.color
    return (
      <div onClick={this.props.onClick} className='col s6'>
        <div className={classes}>
          {this.props.children}
        </div>
      </div>
    )
  }
})
