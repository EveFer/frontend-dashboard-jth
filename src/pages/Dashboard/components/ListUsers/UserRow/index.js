import React from 'react'

import { Link } from 'react-router-dom'

function UserRow ({ id, name, lastName, email, index }) {
  return (
    <tr>
      <th scope='row'>{index + 1}</th>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td><Link to={`/user/${id}`} class='badge badge-pill badge-success'>Ver Detalle</Link></td>
    </tr>
  )
}

export default UserRow
