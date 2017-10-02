import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

export default class Root extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="root-container">
        <div className="links">
          <Link to='/live' activeClassName="active">LIVE</Link>
          <Link to='/stats' activeClassName="active">STATISTICS</Link>
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

Root.propTypes = {
  children: PropTypes.node
}