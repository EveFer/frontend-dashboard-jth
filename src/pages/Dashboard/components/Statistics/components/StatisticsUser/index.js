import React, { Component } from 'react'
import { Bar, Line } from 'react-chartjs-2'

import { getToken } from '../../../../../../libs'
import { getAUserByToken } from '../../../../../../services'

export default class StatisticsUser extends Component {
controller = new AbortController()
  constructor (props) {
    super(props)
    this.state = {
      carbonFootPrint: {},
      nameUser: ''
    }
  }

  async componentDidMount () {
    try {
      const token = getToken()
      const response = await getAUserByToken(token,this.controller)
      const responseJSON = await response.json()
      const { success, data } = responseJSON
      if (success) {
        this.setState({
          carbonFootPrint: data.user.carbonFootprint,
          nameUser: `${data.user.name} ${data.user.lastName}`
        })
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  componentWillUnmount () {
      this.controller.abort()
  }

  render () {
    const { carbonFootPrint, nameUser } = this.state

    const labelsUser = Object.keys(carbonFootPrint)
    const dataUser = Object.values(carbonFootPrint)
    console.log(dataUser)
    // data.labels = labelsUser
    // data.datasets.data = dataUser

    const dataLine = {
      labels: labelsUser,
      datasets: [
        {
          label: nameUser,
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dataUser
        }
      ]
    }

    const data = {
      labels: labelsUser,
      datasets: [
        {
          label: nameUser,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.5)',
          hoverBorderColor: 'rgba(75,192,192,1)',
          data: dataUser
        }
      ]
    }

    return (
      <div>
        <h1>Huella Ecologica</h1>

        <Line data={dataLine} />

        <Bar
          data={data}
          width={100}
          options={{
            maintainAspectRatio: false
          }}
        />

      </div>
    )
  }
}
