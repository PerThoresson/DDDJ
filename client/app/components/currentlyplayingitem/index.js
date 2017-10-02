import React from 'react'
import PropTypes from 'prop-types'

const CurrentlyPlayingItem = (props) => {
  return (
    <div className={'current-item ' + (props.onAir ? 'active' : '') }>
      <div className="image">

        <svg
          width="100px"
          height="101px"
          viewBox="0 0 100 101"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs></defs>
          <g
            id="turntable"
            className={ props.isPlaying ? 'animate' : '' }
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            fillOpacity="0.8">
            <path d="M47.9999846,0.0588710412 C21.3129253,1.10909892 0,23.0842356 0,50.0392282 C0,77.6643138 22.3857625,100.05887 50,100.05887 C77.6142375,100.05887 100,77.6643138 100,50.0392282 C100,23.0842356 78.6870747,1.10909892 52.0000154,0.0588710412 L52,40.2354146 C56.5644806,41.1623193 60,45.1994119 60,50.0392282 C60,55.5642454 55.5228475,60.0431567 50,60.0431567 C44.4771525,60.0431567 40,55.5642454 40,50.0392282 C40,45.1994119 43.4355194,41.1623193 48,40.2354146 L48,0.0588704341 Z" id="Combined-Shape" fill="#000000"></path>
          </g>
        </svg>


      </div>
      <div className="item-content">
        <h3>{ props.title }</h3>
        <p>{ props.artist }</p>
        <p className="faded album">{ props.album }</p>
      </div>
    </div>
  )
}

CurrentlyPlayingItem.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  key: PropTypes.string,
  album: PropTypes.string,
  cover_url: PropTypes.string,
  onAir: PropTypes.bool,
  isPlaying: PropTypes.bool
}

export default CurrentlyPlayingItem
