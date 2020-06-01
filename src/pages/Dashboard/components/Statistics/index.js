import React, { Component } from 'react'

import StatisticsAdmin from './components/StatisticsAdmin'
import StatisticsUser from './components/StatisticsUser'

export default class Statics extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { userCurrent: { role } } = this.props
    let renderComponent
    if (role === 'administrator') {
      renderComponent = <StatisticsAdmin />
    } else if (role === 'user') {
      renderComponent = <StatisticsUser />
    }

    return (
      <div>
        {renderComponent}
      </div>
    )
  }
}
