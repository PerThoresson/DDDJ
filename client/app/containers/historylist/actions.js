import { HISTORY_FETCH_START, HISTORY_FETCH_SUCCESS, HISTORY_FETCH_FAILED } from './constants'
import axios from 'axios'

function historyFetchStart(){
  return {
    type: HISTORY_FETCH_START
  }
}

function historyFetchFailed(){
  return {
    type: HISTORY_FETCH_FAILED
  }
}

function historyFetchSuccess(songs){
  return {
    type: HISTORY_FETCH_SUCCESS,
    payload: songs
  }
}

export function fetchHistory(){
  return (dispatch, getState) => {
    if (getState().history.is_fetching){
      return
    }

    const token = getState().auth.token
    dispatch(historyFetchStart())
    return axios.get(`${API_URL}/history?token=${token}`).then((response) => {
      dispatch(historyFetchSuccess(response.data))
    }).catch(() => {
      dispatch(historyFetchFailed())
    })
  }
}
