'use strict'

var React = require('react')
var io = require('socket.io-client')

var CloseButton = require('../Components/CloseButton.jsx')
var ControlButton = require('../Components/ControlButton.jsx')
var SearchBar = require('../Components/SearchBar.jsx')

var MESSAGES = {errorUrlFormat: 'Wrong URL Format',
                searchBarPlaceholder: 'Password ...',
                title: 'Power',
                logo: 'fa fa-power-off fa-5x'}
var COLOR = 'blue'
var socket = io()

function startShutdown (value) {
  socket.emit('Shutdown:shutdown', value)
}

function cancelShutdown () {
  socket.emit('Shutdown:cancel')
}

module.exports = React.createClass({
  render: function () {
    var cardClasses = 'card lighten-5 page ' + COLOR
    var logoClasses = MESSAGES.logo + ' ' + COLOR + '-text'
    return (
      <div className='col s12'>
        <div className={cardClasses}>
          <div className='container'>
            <div className='row'>
              <div className='col s11 black-text center-align' id='Title'>
                <i className={logoClasses}></i><h1>{MESSAGES.title}</h1>
              </div>
              <div className='col s1 black-text right-align'>
                <CloseButton onClick={this.props.close}/>
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
