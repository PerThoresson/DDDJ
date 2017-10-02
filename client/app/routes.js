import React from 'react'
import { Route, Redirect } from 'react-router'
import Root from './containers/root/index'
import MainPage from './containers/mainpage/index'
import StatsPage from './containers/statschart/index'

export default (
  <Route component={Root}>
    <Redirect from='/' to='/live' />
    <Route path="live" component={MainPage}></Route>
    <Route path="stats" component={StatsPage}></Route>
  </Route>
)
