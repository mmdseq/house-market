import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/AuthContext'

export const useAuthStatus = () => {
  const { userInfo } = useContext(AuthContext)

  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  useEffect(() => {
    if (userInfo) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    setCheckingStatus(false)
  }, [userInfo])

  return { loggedIn, checkingStatus }
}
