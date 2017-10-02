import { combineReducers } from 'redux'
import history from './containers/historylist/reducers'
import currently_playing from './containers/currentlyplaying/reducers'
import stats from './containers/statschart/reducers'
import auth from './core/auth/reducers'

const rootReducer = combineReducers({
  history: history,
  currently_playing: currently_playing,
  auth: auth,
  stats: stats
})

export default rootReducer
