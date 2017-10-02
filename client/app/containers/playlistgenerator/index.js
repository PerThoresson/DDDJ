import React, { Component } from 'react'
import { connect } from 'react-redux'
import { savePlaylist } from './actions'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

const modalCss = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%'
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.95)',
    border: 'none',
    width: '50%',
    height: '25%',
    minHeight: '100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 20px 40px 0 rgba(0,0,0,0.6)'
  }
}

class PlayListGenerator extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      name: ''
    }

    this.onClose = this.onClose.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.save = this.save.bind(this)
    this.nameChanged = this.nameChanged.bind(this)
  }

  onClose(){
    this.setState({ open: false })
  }

  onOpen(){
    this.setState({ open: true })
  }

  save(){
    this.props.savePlaylist(this.state.name)
    this.setState({ open: false })
  }

  nameChanged(e){
    this.setState({ name: e.currentTarget.value })
  }

  render(){
    return(
      <div>
        <h5 className="clickable save-button" onClick={this.onOpen}><strong>SAVE PLAYLIST</strong></h5>
        <Modal
          isOpen={this.state.open}
          style={modalCss}
          contentLabel="Modal"
        >
          <div className="playlist-save-modal">
            <p>Name:</p>
            <input autoFocus type="text" onChange={this.nameChanged}/>
            <div className="buttons">
              <button className="secondary" onClick={this.onClose}>CANCEL</button>
              <button onClick={this.save}>SAVE PLAYLIST</button>
            </div>
          </div>

        </Modal>
      </div>
    )
  }
}

PlayListGenerator.propTypes = {
  savePlaylist: PropTypes.func
}


function mapDispatchToProps(dispatch){
  return {
    savePlaylist: (name) => { dispatch(savePlaylist(name)) }
  }
}

export default connect(null, mapDispatchToProps)(PlayListGenerator)