var React = require('react')

/* props : color, onClick, children, col */
module.exports = React.createClass({
  render: function () {
    var classes = 'card accent-4 center white-text door ' + this.props.color
    var col = 'col ' + this.props.col
    return (
      <div onClick={this.props.onClick} className={col}>
        <div className={classes}>
          {this.props.children}
        </div>
      </div>
    )
  }
})
