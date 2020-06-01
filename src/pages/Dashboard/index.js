import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// components
import Navbar from '../../components/Navbar'
import Aside from '../../components/Aside'
import Content from './components/Content'

//
import { getAUserByToken } from '../../services'
import { getToken } from '../../libs'

import './Dashboard.scss'

export default class Dashboard extends Component {
  controller = new AbortController()
  constructor (props) {
    super(props)
    this.state = {
      isToggled: true,
      userCurrent: {},
      isLoadingUser: false
    }
    this.handleClickArrow = this.handleClickArrow.bind(this)
  }

  handleClickArrow (isToggled) {
    this.setState({ isToggled })
  }

  async componentDidMount () {
    try {
      const token = getToken()
      const response = await getAUserByToken(token, this.controller)
      const responseJSON = await response.json()
      const { success, data } = responseJSON
      if (success) {
        this.setState({
          userCurrent: data.user,
          isLoadingUser: true
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
    const { isAuthenticated } = this.props
    const { isToggled, userCurrent } = this.state
    const className = !isToggled ? 'no-menu' : ''
    return (

      // isAuthenticated ? (
      //   <div className='container-fluid'>
      //     <div className='row'>
      //       <div className='col-12 p-0'>
      //         <Navbar onHandleClick={this.handleClickArrow} />
      //       </div>
      //     </div>

      //     <div className='row'>
      //       <div className={`${className} wrapper-menu-sidebar col col-12 col-md-4 col-lg-4 col-xl-3 p-0`}>
      //         <Aside userCurrent={userCurrent} />
      //       </div>
      //       <div className='col p-4'>
      //         <div className='content scroll p-4'>
      //           <Content userCurrent={userCurrent} />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // ) : (
      //   <Redirect
      //     to={{ pathname: '/login' }}
      //   />
      // )

      <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 p-0'>
              <Navbar onHandleClick={this.handleClickArrow} />
            </div>
          </div>

          <div className='row'>
            <div className={`${className} wrapper-menu-sidebar col col-12 col-md-4 col-lg-4 col-xl-3 p-0`}>
              <Aside userCurrent={userCurrent} />
            </div>
            <div className='col p-4'>
              <div className='content scroll p-4'>
                <Content userCurrent={userCurrent} />
              </div>
            </div>
          </div>
        </div>

    )
  }
}

// import React, { Component } from 'react'

// // components
// import Navbar from '../../components/Navbar'
// import Aside from '../../components/Aside'
// import Content from './components/Content'

// import './Dashboard.scss'

// export default function Dashboard () {
//   return (
//     <div className='container-fluid'>
//       <div className='row'>
//         <div className='col-12 p-0'>
//           <Navbar />
//         </div>
//       </div>

//       <div className='row'>
//         <Aside />
//         <Content />
//       </div>
//     </div>
//   )
// }
