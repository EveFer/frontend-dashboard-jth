// import React from 'react'

// import { Link, useRouteMatch } from 'react-router-dom'

// import './Aside.scss'

// export default function Aside ({ userRole }) {
//   const { url } = useRouteMatch()
//   return (
//     <>
//       <aside className='sidebar'>
//         <div className='user text-center'>
//           <img src='https://cdn-images-1.medium.com/fit/c/120/120/2*qQWdLE4x1YAzQe1ZZc1NXg.jpeg' alt='...' className='img-fluid rounded-circle' />
//           <p>Bienvenid@ <span>Admin</span></p>
//         </div>
//         <div className='admin-menu'>
//           <h2 className='title-menu'>Menú</h2>
//           <ul className='menu'>
//             {
//               userRole === 'administrator'
//                 ? (
//                   <>
//                     <li>
//                       <Link to={`${url}/estadisticas-general`}>
//                         <i class='fas fa-chart-pie' />
//                         Estadisticas
//                       </Link>
//                     </li>
//                     <li>
//                       <Link>
//                         <i class='fas fa-users' />
//                         Usuarios
//                       </Link>
//                       <ul>
//                         <li>
//                           <Link to={`${url}/users`}>
//                             <i className='fas fa-list' />
//                             Ver Todos
//                           </Link>
//                         </li>
//                       </ul>
//                     </li>
//                     <li>
//                       <Link to={`${url}/perfil`}>
//                         <i className='fas fa-pencil-alt' />
//                           Editar Perfil
//                       </Link>
//                     </li>
//                   </>
//                 )
//                 : (
//                   <>
//                     <li>
//                       <Link to={`${url}/mis-estadisticas`}>
//                         <i class='fas fa-chart-pie' />
//                         Mis Estadisticas
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to={`${url}/edit`}>
//                         <i className='fas fa-pencil-alt' />
//                         Perfil
//                       </Link>
//                     </li>
//                   </>
//                 )
//             }
//           </ul>
//         </div>
//       </aside>
//     </>
//   )
// }

import React from 'react'

import { useRouteMatch, Link } from 'react-router-dom'

import './Aside.scss'

export default function Aside ({ userCurrent }) {
  const { name, lastName, role } = userCurrent
  const { url } = useRouteMatch()
  return (
    <aside className='sidebar'>
      <div className='user text-center'>
        <img src='https://cdn-images-1.medium.com/fit/c/120/120/2*qQWdLE4x1YAzQe1ZZc1NXg.jpeg' alt='...' className='img-fluid rounded-circle' />
        <p>Bienvenid@ <span>{`${name} ${lastName}`}</span></p>
      </div>
      <div className='admin-menu'>
        <h2 className='title-menu'>Menú</h2>
        <ul className='menu'>
          {
            role === 'administrator'
              ? (
                <>
                  <li>
                    <Link to={`${url}`}>
                      <i className='fas fa-chart-pie' />
                        Estadisticas
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <i className='fas fa-users' />
                        Usuarios
                    </Link>
                    <ul>
                      <li>
                        <Link to={`${url}users`}>
                          <i className='fas fa-list' />
                            Ver Todos
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )
              : (
                <>
                  <li>
                    <Link to={`${url}`}>
                      <i className='fas fa-chart-pie' />
                        Mis Estadisticas
                    </Link>
                  </li>
                  <li>
                    <Link to={`${url}edit`}>
                      <i className='fas fa-pencil-alt' />
                        Perfil
                    </Link>
                  </li>
                </>
              )
          }
        </ul>
      </div>
    </aside>
  )
}
