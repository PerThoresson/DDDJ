import { HISTORY_FETCH_SUCCESS, HISTORY_FETCH_START, HISTORY_FETCH_FAILED} from './constants'

const defaultState = {
  is_fetching: false,
  songs: []
}

function parseSongKey(keyNumber) {
  let keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  return keys[keyNumber-1] || '-'
}

function millisToMinutesAndSeconds(millis) {
  if (!(typeof millis == 'number')){
    return '-'
  }
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000).toFixed(0)
  let result = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  return result
}

function parsePercentValues(val){
  if (val){
    return (val * 100).toFixed(0) + '%'
  }

  return '-'
}

export default function(state = defaultState, action){
  switch (action.type){
    case HISTORY_FETCH_START:
      return { ...state, is_fetching: true }

    case HISTORY_FETCH_SUCCESS: {
      const parsed = action.payload.map((song) => {
        return { ...song,
          duration: millisToMinutesAndSeconds(song.duration),
          key: parseSongKey(song.key),
          energy: parsePercentValues(song.energy),
          danceability: parsePercentValues(song.danceability),
          tempo: song.tempo ? song.tempo.toFixed(0) : ''
        }
      })
      return { songs: parsed.reverse(), is_fetching: false }
    }

    case HISTORY_FETCH_FAILED:
      return { ...state, is_fetching: false }

    default:
      return state
  }
}