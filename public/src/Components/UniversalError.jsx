var React = require('react')

/* props : color, children */
module.exports = React.createClass({
  render: function () {
    var classes = 'chip white-text ' + this.props.color
    var text = this.props.children ? <div className={classes}>{this.props.children}<i className='material-icons'>close</i></div> : <div></div>
    return text
  }
})
