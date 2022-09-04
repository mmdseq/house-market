import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowLeftIcon } from '../assets/svg/keyboardArrowLeftIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import { toast } from 'react-toastify'
import AuthContext from '../context/auth/AuthContext'
import { signIn } from '../context/auth/AuthActions'
import Spinner from '../components/Spinner'
import Meta from '../components/Meta'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const { userInfo, dispatch, isLoading, isError, message, isSuccess } =
    useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (userInfo || isSuccess) {
      navigate('/')
    }

    dispatch({ type: 'RESET' })
  }, [userInfo, isSuccess, isError, message, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch({ type: 'SET_LOADING' })
      const userData = await signIn({ email, password })
      dispatch({ type: 'SIGN_IN', payload: userData })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'ایمیل یا پسورد اشتباه است' })
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Meta title={'خوش آمدید'} />
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>خوش آمدید</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='email'
            className='emailInput'
            placeholder='لطفا ایمیل خود را وارد کنید'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='لطفا پسورد خود را وارد کنید'
              id='password'
              value={password}
              onChange={onChange}
            />
          </div>

          <div className='signInBar'>
            <p className='signInText'>ورود</p>
            <button type='submit' className='signInButton'>
              <ArrowLeftIcon fill='#ffffff' width='35px' height='35px' />
            </button>
          </div>
        </form>

        <Link to='/sign-up' className='registerLink'>
          ثبت نام
        </Link>
      </div>
    </>
  )
}

export default SignIn
