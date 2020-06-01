import React, { Component } from 'react'
import Swal from 'sweetalert2'
import Moment from 'react-moment'

import './DetailUser.scss'

import { getToken } from '../../../../../libs'
import { getAUser, createSubscription } from '../../../../../services'

export default class DetailUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      subscriptionToAdd: {
        plan: 'free',
        cost: 0,
        dateRenovation: ''
      }
    }
    this.handleClickCreateSubscription = this.handleClickCreateSubscription.bind(this)
    this.handleSubmitSubscription = this.handleSubmitSubscription.bind(this)
    this.handleChangeInput = this.handleChangeInput.bind(this)
  }

  async componentDidMount () {
    try {
      const token = getToken()
      const { id } = this.props.match.params
      const response = await getAUser(id, token)
      const responseJSON = await response.json()
      console.log(responseJSON)
      const { success, data } = responseJSON
      if (success) {
        this.setState({
          user: data.user,
          isCreateSubscription: false
        })
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  handleClickCreateSubscription () {
    const { isCreateSubscription } = this.state
    this.setState({ isCreateSubscription: !isCreateSubscription })
  }

  handleChangeInput ({ target: { name, value } }) {
    const { subscriptionToAdd } = this.state
    this.setState({
      subscriptionToAdd: {
        ...subscriptionToAdd,
        [name]: value
      }
    })
  }

  async handleSubmitSubscription (event) {
    try {
      event.preventDefault()
      const token = getToken()
      const { id } = this.props.match.params
      const { plan, cost, dateRenovation } = this.state.subscriptionToAdd
      const dataToSend = { plan, cost, dateRenovation }
      const response = await createSubscription(id, dataToSend, token)
      const responseJSON = await response.json()
      console.log(responseJSON)
      const { success } = responseJSON
      if (success) {
        Swal.fire(
          'Se ah agregado la suscripción',
          'Exitosamente',
          'success'
        ).then(() => {
          window.location.href = this.props.location.pathname
        })
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  render () {
    const { name, lastName, email, subscription } = this.state.user
    let planSubscription
    let costSubscription
    let dateRenovationSubscription
    let createdAtSubscription
    if (subscription) {
      const { plan, cost, dateRenovation, createdAt } = subscription
      planSubscription = plan
      costSubscription = cost
      dateRenovationSubscription = dateRenovation
      createdAtSubscription = createdAt
    }
    const { isCreateSubscription, subscriptionToAdd: { plan, cost, dateRenovation } } = this.state
    return (
      <div>
        <h1>Datos de Usuario</h1>
        <div className='row p-4'>
          <div className='col-8 mx-auto info-user shadow p-3 mb-5 bg-white mr-3'>
            <div className='user-info-card p-4'>
              <div className='user-data-card'>
                <img src='https://i.picsum.photos/id/1005/120/120.jpg' alt='...' class='img-fluid rounded-circle' />
                <div class='user-data'>
                  <p className='user-name'>{name}</p>
                  <p className='user-last-name'>{lastName}</p>
                  <p className='user-email'>{email}</p>
                </div>
              </div>
              <hr />
              <div className='detail-subscription-wrapper mt-1'>
                {
                  subscription ? (
                    <div>
                      <p className='title'>Suscripción:</p>
                      <div className='detail-subscription'>
                        <div className='detail-keys'>
                          <p>Plan:</p>
                          <p>Costo:</p>
                          <p>Fecha de Inicio:</p>
                          <p>Renovación:</p>
                        </div>
                        <div className='detail-values'>
                          <p>{planSubscription}</p>
                          <p>${costSubscription}</p>
                          <p><Moment format='DD-MM-YYYY'>{dateRenovationSubscription}</Moment></p>
                          <p><Moment format='DD-MM-YYYY'>{createdAtSubscription}</Moment></p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='create-subscription'>
                      <button className='btn-add' onClick={this.handleClickCreateSubscription}>Crear Suscripción</button>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>

        {
          isCreateSubscription ? (
            <div className='border-0 p-5 shadow p-3 mb-5 bg-white rounded'>
              <div>
                <h2>Crear Suscripción</h2>
              </div>
              <form className='form-subscription mt-3' onSubmit={this.handleSubmitSubscription}>
                <div class='form-group'>
                  <label>Plan</label>
                  <select
                    className='form-control select'
                    name='plan'
                    values={plan}
                    onChange={this.handleChangeInput}
                  >
                    <option>Free</option>
                    <option>Basic</option>
                    <option>Premium</option>
                  </select>
                </div>
                <div class='form-group'>
                  <label>Cost</label>
                  <input
                    type='number'
                    class='form-control'
                    aria-describedby='emailHelp'
                    placeholder='0'
                    name='cost'
                    value={cost}
                    onChange={this.handleChangeInput}
                  />
                </div>
                <div class='form-group'>
                  <label>Fecha de Renovación</label>
                  <input
                    type='date'
                    class='form-control'
                    aria-describedby='emailHelp'
                    placeholder='abraham@example.com'
                    name='dateRenovation'
                    value={dateRenovation}
                    onChange={this.handleChangeInput}
                  />
                </div>
                <div class='d-flex justify-content-around'>
                  <button type='submit' className='btn-save'>Agregar</button>
                  <button className='btn-cancel' onClick={this.handleClickCreateSubscription}>Cancelar</button>
                </div>
              </form>
            </div>
          ) : null
        }

      </div>
    )
  }
}
