import { CURRENTLY_PLAYING_FETCH_START, CURRENTLY_PLAYING_FETCH_SUCCESS, CURRENTLY_PLAYING_FETCH_FAILED } from './constants'
import axios from 'axios'

function fetchCurrentlyPlayingStart(){
  return {
    type: CURRENTLY_PLAYING_FETCH_START
  }
}

function fetchCurrentlyPlayingFailed(){
  return {
    type: CURRENTLY_PLAYING_FETCH_FAILED
  }
}

function fetchCurrentlyPlayingSuccess(current){
  return {
    type: CURRENTLY_PLAYING_FETCH_SUCCESS,
    payload: current
  }
}


export function fetchCurrentlyPlaying(){
  return (dispatch, getState) => {
    const { currently_playing } = getState()
    if (currently_playing.is_fetching){
      return
    }

    dispatch(fetchCurrentlyPlayingStart())
    return axios.get(`${API_URL}/current`).then((response) => {
      dispatch(fetchCurrentlyPlayingSuccess(response.data))
    }).catch(() => {
      dispatch(fetchCurrentlyPlayingFailed())
    })
  }
}