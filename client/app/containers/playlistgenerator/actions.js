import  { SAVE_PLAYLIST_SUCCESS, SAVE_PLAYLIST_FAILED } from './constants'
import axios from 'axios'


function savePlaylistSuccess(){
  return {
    type: SAVE_PLAYLIST_SUCCESS
  }
}

function savePlaylistFailed(){
  return {
    type: SAVE_PLAYLIST_FAILED
  }
}

//
export function savePlaylist(name){
  return (dispatch, getState) => {
    const token = getState().auth.token
    axios.post(`${API_URL}/create_playlist?token=${token}`, { name: name }).then(() => {
      dispatch(savePlaylistSuccess())
    }).catch(() => {
      dispatch(savePlaylistFailed())
    })
  }
}