import React from 'react'
import { createContext, useReducer } from 'react'
import authReducer from './AuthReducer'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const initialState = {
    userInfo: userInfo ? userInfo : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
