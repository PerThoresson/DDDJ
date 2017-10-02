import { STATS_FETCH_SUCCESS, STATS_FETCH_START, STATS_FETCH_FAILED} from './constants'

const defaultState = {
  is_fetching: false,
  chartData: {}
}

export default function(state = defaultState, action){
  switch (action.type){
    case STATS_FETCH_START:
      return { ...state, is_fetching: true }

    case STATS_FETCH_SUCCESS:
      return { chartData: action.payload, is_fetching: false }

    case STATS_FETCH_FAILED:
      return { ...state, is_fetching: false }

    default:
      return state
  }
}
