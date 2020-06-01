import React from 'react'

import Statics from '../Statistics'
import EditProfile from '../EditProfile'
import ListUsers from '../ListUsers'
import DetailUser from '../ListUsers/DetailUser'

import './Content.scss'

import { Route, Switch, useRouteMatch } from 'react-router-dom'

export default function Content ({ userCurrent }) {
  const { path } = useRouteMatch()
  console.log(path)
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Statics userCurrent={userCurrent} />
      </Route>
      <Route path={`${path}users`} component={ListUsers} />
      <Route path={`${path}edit`} component={EditProfile}>
        <EditProfile />
      </Route>
      <Route path={`${path}user/:id`} render={(props) => <DetailUser {...props} />} />
    </Switch>
  )
}
