import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowLeftIcon } from '../assets/svg/keyboardArrowLeftIcon.svg'

import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify'
import AuthContext from '../context/auth/AuthContext'
import { signUp } from '../context/auth/AuthActions'
import Spinner from '../components/Spinner'
import Meta from '../components/Meta'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

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
      const userData = await signUp({ name, email, password })
      dispatch({ type: 'SIGN_UP', payload: userData })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'ثبت نام ناموفق بود' })
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Meta title={'ثبت نام'} />
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>خوش آمدید</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='name'
            className='nameInput'
            placeholder='لطفا نام خود را وارد کنید'
            id='name'
            value={name}
            onChange={onChange}
          />
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

          <div className='signUpBar'>
            <p className='signUpText'>ثبت نام و ورود</p>
            <button className='signUpButton'>
              <ArrowLeftIcon fill='#ffffff' width='35px' height='35px' />
            </button>
          </div>
        </form>

        <Link to='/sign-in' className='registerLink'>
          قبلا ثبت نام کرده ام
        </Link>
      </div>
    </>
  )
}

export default SignUp
