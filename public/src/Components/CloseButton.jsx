var React = require('react')

/* props : onClick */
module.exports = React.createClass({
  onKeyDown: function(e) {
    var code = e.which;
    // 13 = Return, 32 = Space
    if ((code === 13) || (code === 32)) {
      this.props.onClick()
    }
  },
  render: function () {
    return (
      <i className='fa fa-times fa-3x right-align valign' onClick={this.props.onClick} tabIndex="0" onKeyDown={this.onKeyDown}></i>
    )
  }
})
