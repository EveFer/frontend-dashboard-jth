const URL_BASE = 'http://localhost:3003/'

const ENDPOINT_USERS = `${URL_BASE}users`

function register (dataUser) {
  const URL = ENDPOINT_USERS
  const options = {
    method: 'POST',
    body: JSON.stringify(dataUser),
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

function logIn (dataCredentials) {
  const URL = `${URL_BASE}auth/login`
  const options = {
    method: 'POST',
    body: JSON.stringify(dataCredentials),
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

function getAllUsers (token, controller) {
  const URL = ENDPOINT_USERS
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    mode: 'cors',
    signal: controller.signal
  }
  return fetch(URL, options)
}

function getAUser (id, token) {
  const URL = `${ENDPOINT_USERS}/${id}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

function getAUserByToken (token, controller) {
  const URL = `${URL_BASE}auth/me`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    mode: 'cors',
    signal: controller.signal
  }
  return fetch(URL, options)
}

function updateAUser (id, dataToUpdate, token) {
  const URL = `${ENDPOINT_USERS}/${id}`
  const options = {
    method: 'PATCH',
    body: JSON.stringify(dataToUpdate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

function createSubscription (idUser, dataSubscription, token) {
  const URL = `${ENDPOINT_USERS}/${idUser}/subscription`
  const options = {
    method: 'POST',
    body: JSON.stringify(dataSubscription),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

export {
  logIn,
  register,
  getAllUsers,
  getAUser,
  updateAUser,
  createSubscription,
  getAUserByToken
}
