/*globals React, ReactDOM, io, Door, CloseButton, SearchBar, ControlButton */

(function Shutdown () {
  'use strict'

  var MESSAGES = {errorUrlFormat: 'Wrong URL Format',
                  searchBarPlaceholder: 'Password ...',
                  title: 'Power',
                  logo: 'fa fa-power-off fa-5x'}
  var COLOR = 'blue'

  var socket = io()

  var ShutdownDoor = (<Door color={COLOR} onClick={showShutdownPage}><i className={MESSAGES.logo}></i><br/>Power</Door>)

  function hideShutdownPage () {
    ReactDOM.render(<div></div>, document.getElementById('page'))
    ReactDOM.render(ShutdownDoor, document.getElementById('shutdown'))
  }

  function showShutdownPage () {
    ReactDOM.render(<ShutdownPage />, document.getElementById('page'))
    ReactDOM.render(<div></div>, document.getElementById('shutdown'))
  }

  function startShutdown (value) {
    socket.emit('Shutdown:shutdown', value)
  }

  function cancelShutdown () {
    socket.emit('Shutdown:cancel')
  }

  var ShutdownPage = React.createClass({
    render: function () {
      var cardClasses = 'card lighten-5 page ' + COLOR
      var logoClasses = MESSAGES.logo + ' ' + COLOR + '-text'
      return (
        <div className='col s12'>
          <div className={cardClasses} id='ShutdownControls'>
            <div className='container'>
              <div className='row'>
                <div className='col s11 black-text center-align' id='Title'>
                  <i className={logoClasses}></i><h1>{MESSAGES.title}</h1>
                </div>
                <div className='col s1 black-text right-align'>
                  <CloseButton onClick={hideShutdownPage}/>
                </div>
              </div>
              <div className='row'>
                <div className='col s12' id='ShutdownErrorRow'>
                </div>
              </div>
              <div className='row'>
                <div className='col s12'>
                  <SearchBar color={COLOR} placeholder={MESSAGES.searchBarPlaceholder} onSubmit={startShutdown}/>
                </div>
              </div>
              <div className='row'>
                <div className='col s12 center-align'>
                  <ControlButton color={COLOR} onClick={cancelShutdown}>Cancel</ControlButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }
  })

  if (window.location.href.indexOf('192.168.1') > 0) {
    ReactDOM.render(ShutdownDoor, document.getElementById('shutdown'))
  }
})()
