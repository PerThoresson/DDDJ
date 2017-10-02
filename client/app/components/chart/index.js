import React from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'

const Item = (props) => {
  if (props.chartData.length === 0) {
    return <div></div>
  }

  let config = {
    ...props.chartData,
    title: {
      text: 'DDDJ metadata',
      style: {
        color: '#FFF'
      }
    },
    chart: {
      backgroundColor: '#000',
      style: {
        color: '#FFF'
      }
    }
  }

  return (
    <ReactHighcharts config={config}></ReactHighcharts>
  )
}

Item.propTypes = {
  chartData: PropTypes.object
}

export default Item
