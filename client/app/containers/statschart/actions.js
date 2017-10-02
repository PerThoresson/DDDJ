import { STATS_FETCH_START, STATS_FETCH_SUCCESS, STATS_FETCH_FAILED } from './constants'
import axios from 'axios'


function statsFetchStart(){
  return {
    type: STATS_FETCH_START
  }
}

function statsFetchFailed(){
  return {
    type: STATS_FETCH_FAILED
  }
}

function statsFetchSuccess(chartData){
  return {
    type: STATS_FETCH_SUCCESS,
    payload: chartData
  }
}

export function fetchStats(){
  return (dispatch, getState) => {
    if (getState().stats.is_fetching){
      return
    }

    dispatch(statsFetchStart())
    return axios.get(`${API_URL}/chart_data`).then((response) => {
      dispatch(statsFetchSuccess(response.data))
    }).catch(() => {
      dispatch(statsFetchFailed())
    })
  }
}
