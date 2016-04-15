/*globals React:true, ReactDOM:true */

'use strict'

var PlayButton = React.createClass({
  handleClick: () => {
    console.log('clic play')
  },
  render: function () {
    return (
      <a className='waves-effect waves-light btn-large red lighten-3 btn-flat' onClick={this.handleClick}><i className="fa fa-play fa-5x"></i></a>
    )}
})

var PauseButton = React.createClass({
  handleClick: () => {
    console.log('clic pause')
  },
  render: function () {
    return (
      <a className='waves-effect waves-light btn-large red lighten-3 btn-flat' onClick={this.handleClick}><i className="fa fa-pause fa-5x"></i></a>
    )}
})

var PreviousButton = React.createClass({
  handleClick: () => {
    console.log('clic previous')
  },
  render: function () {
    return (
      <a className='waves-effect waves-light btn-large red lighten-3 btn-flat' onClick={this.handleClick}><i className="fa fa-step-backward fa-5x"></i></a>
    )}
})

var NextButton = React.createClass({
  handleClick: () => {
    console.log('clic next')
  },
  render: function () {
    return (
      <a className='waves-effect waves-light btn-large red lighten-3 btn-flat' onClick={this.handleClick}><i className="fa fa-step-forward fa-5x"></i></a>
    )}
})

var BigNextButton = React.createClass({
  handleClick: () => {
    console.log('clic bigNext')
  },
  render: function () {
    return (
      <a className='waves-effect waves-light btn-large red lighten-3 btn-flat' onClick={this.handleClick}><i className="fa fa-arrow-right fa-5x"></i></a>
    )}
})

var ClearButton = React.createClass({
  handleClick: () => {
    console.log('clic clear')
  },
  render: function () {
    return (
      <a className='waves-effect waves-light btn-large red lighten-3 btn-flat' onClick={this.handleClick}><i className="fa fa-trash fa-5x"></i></a>
    )}
})

var SearchBar = React.createClass({
  getInitialState: function() {
    return {value: ''}
  },
  handleSubmit: function(event) {
    event.preventDefault()
    console.log('search submit',this.state.value)
  },
  handleChange: function (event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    return (
      <form action='/' method='post' onSubmit={this.handleSubmit}>
      <div class="input-field">
      <input id="search" type='text' className='red lighten-3 black-text' value={this.state.value} onChange={this.handleChange} placeholder="Search ..."/>
      </div>
      <input type='submit' hidden/>
      </form>
    )}
})

var YoutubeDoor = React.createClass({
  handleClick: () => {
    ReactDOM.render(<YoutubePage />, document.getElementById('youtube'))
  },
  render: function () {
    return (
      <div onClick={this.handleClick} className='col s6'>
      <div className='card red accent-4 center white-text waves-effect waves-block waves-light' id="YoutubeActivator">
      <div>
      <i className='fa fa-youtube-play fa-5x'></i><br/>Youtube
      </div>
      </div>
      </div>
    )}
})

var YoutubePage = React.createClass({
  render: () => {
    return (
      <div className='col s12'>
        <div className='card red lighten-5' id="YoutubeControls">
        <div className="container">
        <div className='row'>
            <div className='col s12 black-text center-align' id="Title">
              <i className='fa fa-youtube-play fa-5x red-text'></i><h1>Youtube</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col s12'>
              <SearchBar />
            </div>
          </div>
          <div className='row'>
            <div className='col s3 center-align'>
              <PreviousButton />
            </div>
            <div className='col s3 center-align'>
              <PlayButton />
            </div>
            <div className='col s3 center-align'>
              <NextButton />
            </div>
          </div>
          <div className='row'>
            <div className='col s3 center-align'>
              <ClearButton />
            </div>
            <div className='col s3 center-align'>
              <PauseButton />
            </div>
            <div className='col s3 center-align'>
              <BigNextButton />
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
})

ReactDOM.render(<YoutubeDoor />, document.getElementById('youtube'))
