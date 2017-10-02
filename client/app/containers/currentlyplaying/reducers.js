import { CURRENTLY_PLAYING_FETCH_START, CURRENTLY_PLAYING_FETCH_SUCCESS, CURRENTLY_PLAYING_FETCH_FAILED } from './constants'

const defaultState = {
  is_fetching: false,
  songs: []
}

export default function(state = defaultState, action){
  switch (action.type){
    case CURRENTLY_PLAYING_FETCH_START:
      return { ...state, is_fetching: true }

    case CURRENTLY_PLAYING_FETCH_SUCCESS:
      return { songs: action.payload, is_fetching: false }

    case CURRENTLY_PLAYING_FETCH_FAILED:
      return { ...state, is_fetching: false }

    default:
      return state

  }
}