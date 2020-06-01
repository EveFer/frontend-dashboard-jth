import React, { Component } from 'react'
import Swal from 'sweetalert2'
import Moment from 'react-moment'

import './EditPerfil.scss'

import { getToken } from '../../../../libs'
import { getAUserByToken, updateAUser } from '../../../../services'

export default class EditProfile extends Component {
  controller = new AbortController()
  constructor (props) {
    super(props)
    this.state = {
      user: {
        name: '',
        lastName: '',
        email: '',
        subscription: ''
      }
    }
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount () {
    try {
      const token = getToken()
      const response = await getAUserByToken(token, this.controller)
      const responseJSON = await response.json()
      const { success, data } = responseJSON
      if (success) {
        this.setState({
          user: data.user
        })
      }
    } catch (error) {

    }
  }

  handleChangeInput ({ target: { name, value } }) {
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  async handleSubmit (event) {
    try {
      event.preventDefault()
      const token = getToken()
      const { name, lastName, email, _id } = this.state.user
      const dataToUpdate = { name, lastName, email }
      const response = await updateAUser(_id, dataToUpdate, token)
      const responseJSON = await response.json()

      const { success, data } = responseJSON
      if (success) {
        this.setState({
          user: data.user
        })
        Swal.fire(
          'Se han actualizado los datos',
          'Exitosamente',
          'success'
        ).then(() => {
          window.location.href = '/'
        })
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  render () {
    const { name, lastName, email, subscription } = this.state.user
    return (
      <div className='row'>
        <div className='col'>
          <div className='border-0 p-5  shadow p-3 mb-5 bg-white rounded'>
            <div>
              <h2>Perfil</h2>
            </div>
            <form className='form-edit-profile mt-3' onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label>Nombre(s)</label>
                <input
                  type='text'
                  className='form-control'
                  aria-describedby='nameHelp'
                  placeholder='Abraham Moises'
                  name='name'
                  value={name}
                  onChange={this.handleChangeInput}
                />
              </div>
              <div className='form-group'>
                <label>Apellido(s)</label>
                <input
                  type='text'
                  className='form-control'
                  aria-describedby='lastNameHelp'
                  placeholder='Palacios Vera'
                  name='lastName'
                  value={lastName}
                  onChange={this.handleChangeInput}
                />
              </div>
              <div className='form-group'>
                <label>Correo Electrónico</label>
                <input
                  type='email'
                  className='form-control'
                  aria-describedby='emailHelp'
                  placeholder='abraham@example.com'
                  name='email'
                  value={email}
                  onChange={this.handleChangeInput}
                />
              </div>
              <div className='d-flex justify-content-center'>
                <button type='submit' className='btn-save'>Guardar</button>
              </div>
            </form>
          </div>

        </div>

        <div className='col'>
          {
            subscription ? (
              <div className='subscription-info border-0 p-5 shadow p-3 mb-5 bg-white rounded'>
                <h2>Suscripción</h2>
                <div className='card border-0 rounded mt-5'>
                  <ul class='list-group list-group-horizontal border-0'>
                    <li class='list-group-item w-50 border-0 subscription-info-title'>Plan:</li>
                    <li class='list-group-item w-50 border-0 subscription-info-value'>{subscription.plan}</li>
                  </ul>
                  <ul class='list-group list-group-horizontal border-0'>
                    <li class='list-group-item w-50 border-0 subscription-info-title'>Costo:</li>
                    <li class='list-group-item w-50 border-0 subscription-info-value'>${subscription.cost}</li>
                  </ul>
                  <ul class='list-group list-group-horizontal border-0'>
                    <li class='list-group-item w-50 border-0 subscription-info-title'>Fecha de Inicio:</li>
                    <li class='list-group-item w-50 border-0 subscription-info-value'><Moment format='DD-MM-YYYY'>{subscription.createdAt}</Moment></li>
                  </ul>
                  <ul class='list-group list-group-horizontal border-0'>
                    <li class='list-group-item w-50 border-0 subscription-info-title'>Renovación:</li>
                    <li class='list-group-item w-50 border-0 subscription-info-value'><Moment format='DD-MM-YYYY'>{subscription.dateRenovation}</Moment></li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className='subscription-info border-0 p-5 shadow p-3 mb-5 bg-white rounded'>
                <h2>Solicita tu suscripción</h2>
                <div className='card border-0 rounded mt-5'>
                  <div>Solicita tu suscripción</div>
                </div>
              </div>
            )
          }
        </div>

      </div>

    )
  }
}
