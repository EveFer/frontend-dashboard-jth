import React, { Component } from 'react'

import UserRow from './UserRow'

import './ListUser.scss'

import { getToken } from '../../../../libs'
import { getAllUsers } from '../../../../services'

export default class ListUsers extends Component {
  controller = new AbortController()
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
    this.handleRenderUser = this.handleRenderUser.bind(this)
  }

  async componentDidMount () {
    try {
      const token = getToken()
      const response = await getAllUsers(token, this.controller)
      const responseJSON = await response.json()
      console.log(responseJSON)
      const { success, data } = responseJSON
      if (success) {
        this.setState({
          users: data.users
        })
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  componentWillUnmount () {
    this.controller.abort()
  }

  handleRenderUser () {
    const { users } = this.state
    return users.map(({ _id, name, lastName, email }, index) => (<UserRow key={_id} id={_id} name={name} lastName={lastName} email={email} index={index} />))
  }

  render () {
    return (
      <div className='table-users'>
        <div>
          <h2>Users</h2>
        </div>
        <div className='search-wrapper mt-4'>
          <i class='fas fa-search' />
          <input type='text' className='search-input' placeholder='Buscar...' />
        </div>
        <table class='table table-hover mt-4'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Nombre(s)</th>
              <th scope='col'>Apellido(s)</th>
              <th scope='col'>Correo Electrónico</th>
              <th scope='col'>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.handleRenderUser()}
          </tbody>
        </table>
      </div>
    )
  }
}
