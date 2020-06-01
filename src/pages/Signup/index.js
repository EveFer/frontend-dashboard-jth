import React, { Component } from 'react'

import logo from '../../assets/img/logo.png'

import Form from '../../components/Form'

import { register } from '../../services'

import './SignUp.scss'

export default class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRegistered: false,
      error: ''
    }
    this.handleSendRequest = this.handleSendRequest.bind(this)
  }

  async handleSendRequest (dataToRegister) {
    try {
      const response = await register(dataToRegister)
      const responseJSON = await response.json()
      console.log(responseJSON)
      const { success, data } = responseJSON
      if (success) {
        window.localStorage.setItem('authToken', data.token)
        this.setState({
          isRegistered: true,
          error: null
        })
        window.location.href = '/login'
        return
      }
      this.setState({
        error: data.message
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  render () {
    const { error } = this.state
    return (
      <>
        <div className='container-fluid bg-img-intro vh-100'>
          <div className='row child-intro mb-0'>
            <div className='col-10 col-md-4 mx-auto'>
              <header>
                <img src={logo} className='img-fluid' alt='img' />
              </header>
            </div>
          </div>
          <div className='row align-items-center child-intro '>
            <div className='col-12 col-md-6 col-lg-4 mx-auto'>
              <Form isSignUp onHandleSendRequest={this.handleSendRequest} errorMessage={error} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
