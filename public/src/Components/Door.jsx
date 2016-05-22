var React = require('react')

/* props : color, onClick, children, col */
module.exports = React.createClass({
  getInitialState: function () {
    return {classes: 'card accent-4 center white-text door ' + this.props.color}
  },
  onFocus: function () {
    this.setState({classes: 'card lighten-4 center ' + this.props.color + '-text door ' + this.props.color})
  },
  onBlur: function () {
    this.setState({classes: 'card accent-4 center white-text door ' + this.props.color})
  },
  onKeyDown: function (e) {
    var code = e.which
    // 13 = Return, 32 = Space
    if ((code === 13) || (code === 32)) {
      this.props.onClick()
    }
  },
  render: function () {
    var col = 'col ' + this.props.col
    return (
      <div onClick={this.props.onClick} tabIndex='0' onFocus={this.onFocus} onBlur={this.onBlur} className={col} onKeyDown={this.onKeyDown}>
        <div className={this.state.classes}>
          {this.props.children}
        </div>
      </div>
    )
  }
})
