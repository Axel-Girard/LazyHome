/*globals $*/
var React = require('react')

/* props : color, placeholder, onSubmit */
module.exports = React.createClass({
  componentDidMount: function () {
    setTimeout(() => { $('input').focus() }, 0)
  },
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
