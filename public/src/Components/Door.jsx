var React = require('react')

/* props : color, onClick, children */
module.exports = React.createClass({
  render: function () {
    var classes = 'card accent-4 center white-text waves-effect waves-block waves-light activator ' + this.props.color
    return (
      <div onClick={this.props.onClick} className='col s4'>
        <div className={classes}>
          {this.props.children}
        </div>
      </div>
    )
  }
})
