import axios from 'axios'

const API_URL = 'http://localhost:5000'

export const signIn = async (userData) => {
  const { data } = await axios.post(API_URL + '/login', userData)

  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  return data
}

export const signUp = async (userData) => {
  const { data } = await axios.post(API_URL + '/register', userData)

  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  return data
}

export const logout = () => {
  localStorage.removeItem('userInfo')
}
