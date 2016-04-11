/*globals React:true, ReactDOM:true */

'use strict'

var ShutdownElement = React.createClass({
  render: () => {
    return (<div className='col s6'>
            <div className='card blue center white-text waves-effect waves-block waves-light'>
            <div className='card-image activator'>
            <i className='fa fa-power-off fa-5x'></i>
            </div>

            <div className='card-content activator'> Power </div>
            <div className='card-reveal blue blue lighten-5'>
            <span className='card-title blue-text'><i className='fa fa-times-circle fa-5x'></i></span>

            <form action='/' method='post' id='co_shutdown'>
            <input id='Shutdown_password' type='text' className='blue white-text'/>
            <input type='submit' hidden/>
            <a className='waves-effect waves-light btn-large blue' id='Shutdown_shutdown'><i className='material-icons'>power_settings_new</i></a>
            <a className='waves-effect waves-light btn-large blue' id='Shutdown_cancel'><i className='material-icons right'>loop</i>Cancel</a>
            </form>
            <span className='card-title blue-text' id='countdown'></span>
            </div>
            </div>
            </div>
           )
  }
})

if (window.location.href.indexOf('192.168.1') > 0) {
  ReactDOM.render(<ShutdownElement />, document.getElementById('shutdown'))
}
