import React from 'react'
import PropTypes from 'prop-types'

const Item = (props) => {
  return (
    <tr className="song">
      <td>
        <div className="image" style={{ backgroundImage: `url(${props.cover_url})`}}></div>
      </td>
      <td className="title">
        <h3>{ props.name}</h3>
        <p>{ props.artist }</p>

      </td>
      <td>
        <p><span className="faded">POPUL.</span> { props.popularity }% </p>
        <p><span className="faded">DANCE.</span> { props.danceability } </p>
        <p><span className="faded">ENERGY</span> { props.energy } </p>
      </td>
      <td>
        <p><span className="faded">BPM</span> { props.tempo }</p>
        <p><span className="faded">KEY</span> { props.songKey }</p>
      </td>
      <td>{ props.duration }</td>
    </tr>
  )
}

Item.propTypes = {
  name: PropTypes.string,
  artist: PropTypes.string,
  cover_url: PropTypes.string,
  album: PropTypes.string,
  popularity: PropTypes.number,
  danceability: PropTypes.string,
  energy: PropTypes.string,
  tempo: PropTypes.string,
  songKey: PropTypes.string,
  duration: PropTypes.string,
}

export default Item
