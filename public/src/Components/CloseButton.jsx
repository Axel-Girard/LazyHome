var React = require('react')

/* props : onClick */
module.exports = React.createClass({
  render: function () {
    return (
      <i className='fa fa-times fa-3x right-align valign' onClick={this.props.onClick}></i>
    )
  }
})
