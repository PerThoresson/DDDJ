import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentlyPlaying } from './actions'
import PropTypes from 'prop-types'
import CurrentlyPlayingItem from '../../components/currentlyplayingitem/index'

class CurrentlyPlaying extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.fetchCurrentlyPlaying()
    this.startPolling()
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  startPolling(){
    this.interval = setInterval(() => this.props.fetchCurrentlyPlaying(), 1500)
  }

  render(){
    if (this.props.currently_playing.songs.length === 0){
      return (<div>No songs playing :(</div>)
    }

    return (
      <div>
        <h4 className="history-title">Currently Playing <span><i>({ this.props.currently_playing.songs.length } active)</i></span></h4>
        <div className="currently-playing">
          { this.props.currently_playing.songs.map((song) => {
            return <CurrentlyPlayingItem
              key={song._id}
              title={song.title}
              artist={song.artist}
              album="Album"
              onAir={song.onAir}
              isPlaying={song.isPlaying}
            />
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currently_playing: state.currently_playing
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchCurrentlyPlaying: () => { dispatch(fetchCurrentlyPlaying()) }
  }
}

CurrentlyPlaying.propTypes = {
  currently_playing: PropTypes.object,
  fetchCurrentlyPlaying: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentlyPlaying)
