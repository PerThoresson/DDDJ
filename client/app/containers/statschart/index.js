import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import StatsChart from '../../components/chart/index'
import { fetchStats } from './actions'

class StatsPage extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchStats()
  }

  render(){
    return (
      <div>
        <StatsChart chartData={this.props.chartData}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    chartData: state.stats.chartData
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchStats: () => { dispatch(fetchStats()) }
  }
}

StatsPage.propTypes = {
  chartData: PropTypes.object,
  fetchStats: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage)
