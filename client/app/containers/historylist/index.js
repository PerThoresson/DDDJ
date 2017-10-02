import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchHistory } from './actions'
import PropTypes from 'prop-types'
import HistoryItem from '../../components/historylistitem/index'
import PlayListGenerator from '../playListgenerator/index'

class HistoryList extends Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.fetchHistory()
    this.startPolling()
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  startPolling(){
    this.interval = setInterval(() => this.props.fetchHistory(), 1500)
  }

  render(){
    if (this.props.history.songs.length === 0){
      return (<div>No songs :(</div>)
    }

    return (
      <div className="history-container">
        <div className="header">
          <h4 className="history-title">History <span><i>({ this.props.history.songs.length } tracks)</i></span></h4>
          <PlayListGenerator></PlayListGenerator>
        </div>
        <table className="song-list">
          <thead>
            <tr>
              <th>ALBUM ART</th>
              <th>INFO</th>
              <th>META</th>
              <th>INFO</th>
              <th>DURATION</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.history.songs.map((song) => {
                return <HistoryItem
                  key={ song._id }
                  name={ song.title }
                  artist={ song.artist }
                  album={ song.album || 'Unknown'}
                  cover_url={ song.cover_url }
                  popularity={ song.popularity || '-' }
                  duration={ song.duration || '-' }
                  danceability={ song.danceability || '-'}
                  energy={ song.energy }
                  songKey={ song.key || '-' }
                  tempo={ song.tempo || '-' }
                />
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    history: state.history
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchHistory: () => { dispatch(fetchHistory()) }
  }
}

HistoryList.propTypes = {
  history: PropTypes.object,
  fetchHistory: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList)
