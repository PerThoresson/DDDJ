import React, { Component } from 'react'
import HistoryList from '../historylist/index'
import CurrentlyPlaying from '../currentlyplaying/index'

class MainPage extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render(){
    return (
      <div>
        <CurrentlyPlaying />
        <HistoryList />
      </div>
    )
  }
}

export default MainPage
