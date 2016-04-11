/*globals React:true, ReactDOM:true */

'use strict'

var YoutubeElement = React.createClass({
  render: () => {
    return (<div className='col s6'>
            <div className='card red accent-4 center white-text waves-effect waves-block waves-light'>
            <div className='card-image activator'>
            <i className='fa fa-youtube-play fa-5x'></i>
            </div>

            <div className='card-content activator'> Youtube </div>
            <div className='card-reveal red lighten-5'>
            <span className='card-title red-text'><i className='fa fa-times-circle fa-5x'></i></span>

            <form action='/' method='post' id='Youtube_form'>
            <input id='Youtube_url' type='text' className='red white-text'/>
            <input type='submit' hidden/>
            <a className='waves-effect waves-light btn-large red' id='Youtube_play'><i className='material-icons'>play_arrow</i></a>
            <a className='waves-effect waves-light btn-large red' id='Youtube_pause'><i className='material-icons'>pause</i></a>
            <a className='waves-effect waves-light btn-large red' id='Youtube_stop'><i className='material-icons'>stop</i></a><br/>
            <a className='waves-effect waves-light btn-large red' id='Youtube_previous'><i className='material-icons'>skip_previous</i></a>
            <a className='waves-effect waves-light btn-large red' id='Youtube_next'><i className='material-icons'>skip_next</i></a>
            <a className='waves-effect waves-light btn-large red' id='Youtube_skipPlaylist'><i className='material-icons'>trending_flat</i></a>
            <p className='range-field'>
            <input type='range' id='Youtube_volume' min='0' max='100'/>
            </p>
            <a className='waves-effect waves-light btn-large red' href='/Youtube' target='_blank'>Watch</a>
            </form>
            </div>
            </div>
            </div>
           )
  }
})

ReactDOM.render(<YoutubeElement />, document.getElementById('youtube'))
