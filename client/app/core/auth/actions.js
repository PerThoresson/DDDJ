import { SET_TOKEN, CLEAR_TOKEN } from './constants'

export function setToken(token){
  return {
    type: SET_TOKEN,
    payload: token
  }
}

export function clearToken(){
  return {
    type: CLEAR_TOKEN
  }
}