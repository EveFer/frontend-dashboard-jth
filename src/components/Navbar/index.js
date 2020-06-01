import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { getToken, deleteToken } from '../../libs'

import logo from '../../assets/img/logo.png'

import './Navbar.scss'

export default class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isToggled: true
    }
    this.handleClickArrow = this.handleClickArrow.bind(this)
    this.handleLogOutUser = this.handleLogOutUser.bind(this)
  }

  handleClickArrow () {
    console.log('Click desde nav')
    const { isToggled } = this.state
    this.setState({ isToggled: !isToggled })
    this.props.onHandleClick(isToggled)
  }

  handleLogOutUser () {
    if (getToken()) {
      deleteToken()
      window.location.href = '/login'
    }
  }

  render () {
    const { isToggled } = this.state
    return (
      <>
        <header className='header'>
          <div className='name-site'>
            <img className='img-fluid logo view-desktop' src={logo} alt='logo' />
            <h1 className='view-mobile'>DB</h1>
          </div>
          <nav className='nav'>
            <div className='left-menu' onClick={this.handleClickArrow}>
              {
                isToggled ? (
                  <i className='fas fa-arrow-right' />
                ) : (
                  <i className='fas fa-arrow-left' />
                )
              }
            </div>
            <div className='right-menu'>
              <div className='alerts box'>
                <Link href='#'>
                  <i className='fas fa-bell' />
                  <div />
                </Link>
              </div>
              <div className='box'>
                <button className='btn-logout'><i className='fas fa-sign-out-alt' onClick={this.handleLogOutUser} /></button>
              </div>
            </div>
          </nav>
        </header>
      </>

    )
  }
}
