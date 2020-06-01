import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import './Form.scss'

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmationPassword: ''
    }
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeInput ({ target: { name, value } }) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const { name, lastName, email, password, confirmationPassword } = this.state
    const data = { name, lastName, email, password, confirmationPassword }
    this.props.onHandleSendRequest(data)
    this.setState({
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmationPassword: ''
    })
  }

  render () {
    const { isSignUp, errorMessage } = this.props
    const content = {}
    if (isSignUp) {
      content.button = 'Registrar'
      content.link = 'Iniciar Sesión'
      content.router = '/login'
    } else {
      content.button = 'Iniciar Sesión'
      content.link = 'Registrarme'
      content.router = '/signup'
    }
    const { name, lastName, email, password, confirmationPassword } = this.state
    return (
      <form className='p-5 bg-form' onSubmit={this.handleSubmit}>
        <div className='form-group form-input'>
          {
            isSignUp
              ? (
                <>
                  <div className='form-group form-input'>
                    <input
                      className='form-control'
                      placeholder='Nombre'
                      aria-describedby='nameHelp'
                      value={name}
                      name='name'
                      onChange={this.handleChangeInput}
                    />
                  </div>
                  <div className='form-group form-input'>
                    <input
                      className='form-control'
                      placeholder='Apellidos'
                      aria-describedby='lastNameHelp'
                      value={lastName}
                      name='lastName'
                      onChange={this.handleChangeInput}
                    />
                  </div>
                </>
              )
              : null
          }
          <input
            type='email'
            className='form-control'
            placeholder='Correo Electrónico'
            aria-describedby='emailHelp'
            value={email}
            name='email'
            onChange={this.handleChangeInput}
          />
        </div>
        <div className='form-group form-input'>
          <input
            type='password'
            className='form-control'
            placeholder='Password'
            value={password}
            name='password'
            onChange={this.handleChangeInput}
          />
        </div>
        {
          isSignUp
            ? (
              <div className='form-group form-input'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Confirmación de Contraseña'
                  value={confirmationPassword}
                  name='confirmationPassword'
                  onChange={this.handleChangeInput}
                />
              </div>
            )
            : null
        }

        {
          errorMessage ? (
            <div className='form-group form-input text-center mb-2 text-center d-flex justify-content-center'>
              <p className='text-error'>{errorMessage}</p>
            </div>
          ) : null
        }

        <div className='d-flex flex-column justify-content-around align-items-center form-input'>
          <button type='submit' className='btn-login btn-success'>{content.button}</button>
          <Link to={content.router} className='link-signup '>{content.link}</Link>
        </div>
      </form>
    )
  }
}
