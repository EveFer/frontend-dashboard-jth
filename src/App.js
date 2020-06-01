import React, { useState, useEffect } from 'react'
import './App.scss'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// pages
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

import { getToken } from './libs'

function App () {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    const authToken = getToken()
    if (authToken) {
      setIsUserLoggedIn(true)
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/'>
          <Dashboard />
        </Route>
        <Dashboard isAuthenticated={isUserLoggedIn} />

        {/* <Route path='*'>
          <NotFound />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App
