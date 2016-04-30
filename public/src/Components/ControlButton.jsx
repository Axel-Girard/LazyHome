var React = require('react')

/* props : color, onClick, children */
module.exports = React.createClass({
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

