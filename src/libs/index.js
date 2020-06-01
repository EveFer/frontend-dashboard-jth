function setToken (token) {
  localStorage.setItem('authToken', token)
}

function getToken () {
  return localStorage.getItem('authToken')
}

function deleteToken () {
  localStorage.removeItem('authToken')
}

export { setToken, getToken, deleteToken }
