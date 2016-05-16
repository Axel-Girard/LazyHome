'use strict'

var React = require('react')
var io = require('socket.io-client')

var CloseButton = require('../Components/CloseButton.jsx')
var SearchBar = require('../Components/SearchBar.jsx')

var MESSAGES = {searchBarPlaceholder: 'Channel ...',
                title: 'Twitch',
                logo: 'fa fa-twitch fa-4x'}
var COLOR = 'purple'
var socket = io()

function emitChannel (value) {
  socket.emit('Twitch:new', value)
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
                <SearchBar color={COLOR} placeholder={MESSAGES.searchBarPlaceholder} onSubmit={emitChannel}/>
              </div>
            </div>
            <div className='row'>
              <div className='col s12 center-align'>
                <a className='waves-effect waves-light btn-large purple lighten-3 btn-flat' href='/Twitch' target='_blank'>
                  <b>View</b>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) }
})
