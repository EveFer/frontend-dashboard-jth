import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import logo from '../../assets/img/logo.png'

import Form from '../../components/Form'

import { setToken } from '../../libs'
import { logIn } from '../../services'

import './Login.scss'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      isLoggedIn: false
    }
    this.handleSendRequest = this.handleSendRequest.bind(this)
  }

  async handleSendRequest (credentials) {
    try {
      const response = await logIn(credentials)
      const responseJSON = await response.json()
      console.log(responseJSON)
      const { success, data } = responseJSON
      if (success) {
        setToken(data.token)
        this.setState({
          isLoggedIn: true,
          error: null
        })
        window.location.href = '/'
        return
      }
      this.setState({
        error: data.message
      })
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  render () {
    const { error, isLoggedIn } = this.state
    return (
      <>
        <div className='container-fluid bg-img-intro vh-100'>
          <div className='row child-intro'>
            <div className='col-10 col-md-4 mx-auto'>
              <header>
                <img src={logo} className='img-fluid' alt='img' />
              </header>
            </div>
          </div>
          <div className='row align-items-center child-intro '>
            <div className='col-12 col-md-6 col-lg-4 mx-auto'>
              <Form onHandleSendRequest={this.handleSendRequest} errorMessage={error} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
