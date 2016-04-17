/*globals React, $ */
/*eslint-disable no-unused-vars*/

'use strict'

/* props : color, onClick, children */
function ControlButton (props) {
  var classes = 'waves-effect waves-light btn-large lighten-3 btn-flat ' + props.color
  return (
    <a className={classes} onClick={props.onClick}>
      {props.children}
    </a>
  )
}

/* props : onClick */
function CloseButton (props) {
  return (
    <i className='fa fa-times fa-3x right-align valign' onClick={props.onClick}></i>
  )
}

/* props : color, children */
function UniversalError (props) {
  var classes = 'chip white-text ' + props.color
  var text = props.children ? <div className={classes}>{props.children}<i className='material-icons'>close</i></div> : <div></div>
  return text
}

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
function Door (props) {
  var classes = 'card accent-4 center white-text waves-effect waves-block waves-light activator ' + props.color
  return (
    <div onClick={props.onClick} className='col s6'>
      <div className={classes}>
        {props.children}
      </div>
    </div>
  )
}
