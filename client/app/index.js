import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import Routes from './routes.js'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Reducers from './reducers.js'

require('./main.scss')

import { setToken } from './core/auth/actions'
import axios from 'axios'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(Reducers)

function checkAuth(store, callback){
  const { auth } = store.getState()
  const hash = window.location && window.location.hash.substring(1)

  if (!auth.token && hash){
    store.dispatch(setToken(hash))
    window.location.hash = ''
    callback(true)
  } else if (!auth.token && !hash){
    axios.get(`${API_URL}/login`).then((response) => {
      window.location = response.data.href
    })
  }
}

checkAuth(store, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={Routes}/>
    </Provider>
    , document.querySelector('#container'))
})
