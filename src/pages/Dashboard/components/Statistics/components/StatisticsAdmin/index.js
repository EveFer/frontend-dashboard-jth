import React, { Component } from 'react'

import Chart from './Chart'

import { getToken } from '../../../../../../libs'
import { getAllUsers } from '../../../../../../services'



export default class StatisticsAdmin extends Component {
  controller = new AbortController()
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
    this.renderUsers = this.renderUsers.bind(this)
  }

  async componentDidMount () {
    try {
      const token = getToken()
      const response = await getAllUsers(token, this.controller)
      const responseJSON = await response.json()
      const {success, data} = responseJSON
      if(success) {
        this.setState({
          users: data.users
        })
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  renderUsers () {
    const {users} = this.state
    
    return users.map(user => (<Chart user={user} />))
  }

  componentWillUnmount () {
    this.controller.abort()
  }

  render () {
    return (
      <div>
        <h1>Estadísticas</h1>
        {this.renderUsers()}
      </div>
    )
  }
}
