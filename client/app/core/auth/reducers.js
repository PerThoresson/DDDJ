import { SET_TOKEN, CLEAR_TOKEN } from './constants'

const defaultState = {
  token: null
}

export default function(state = defaultState, action){
  switch (action.type){
    case SET_TOKEN:
      return { ...state, token: action.payload }

    case CLEAR_TOKEN:
      return { ...state, token: null }

    default:
      return state
  }
}