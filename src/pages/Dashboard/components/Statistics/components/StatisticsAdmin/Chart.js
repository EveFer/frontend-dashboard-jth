import React, { Component } from 'react'

import { Line } from 'react-chartjs-2'

export default class Chart extends Component {
  constructor (props) {
    super(props)
    this.renderChart = this.renderChart.bind(this)
  }

  renderChart () {
    const { user } = this.props
    const labelsUser = Object.keys(user.carbonFootprint)
    const dataUser = Object.values(user.carbonFootprint)
    const name = user.name

    const dataLine = {
      labels: labelsUser,
      datasets: [
        {
          label: name,
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

    return (<Line data={dataLine} />)
  }

  render () {
    return (
      <div>
        {this.renderChart()}
      </div>
    )
  }
}
