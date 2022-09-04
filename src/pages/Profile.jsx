import { ReactComponent as ArrowLeft } from '../assets/svg/keyboardArrowLeftIcon.svg'
import { ReactComponent as HomeIcon } from '../assets/svg/homeIcon.svg'
import { Link, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/AuthContext'
import { logout } from '../context/auth/AuthActions'
import ListingsContext from '../context/listings/ListingsContext'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import {
  deleteListing,
  getMyListings,
} from '../context/listings/ListingsActions'
import ThemeContext from '../context/theme/ThemeContext'
import Meta from '../components/Meta'

function Profile() {
  const [myListings, setMyListing] = useState([])
  const { userInfo, dispatch } = useContext(AuthContext)
  const { theme, changeTheme } = useContext(ThemeContext)

  const changeThemeHand = () => {
    changeTheme()
  }

  const navigate = useNavigate()

  const { isLoading, dispatch: dispatchListing } = useContext(ListingsContext)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await getMyListings(userInfo.user.id)
        setMyListing(data)
        dispatchListing({ type: 'GET_LISTINGS', payload: data })
      } catch (error) {
        dispatchListing({ type: 'SET_ERROR', payload: error.message })
      }
    }
    fetchListings()
  }, [dispatchListing, userInfo.user.id])

  const onLogout = () => {
    logout()
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const onDelete = async (listingId) => {
    if (window.confirm('آگهی حذف شود؟')) {
      dispatch({ type: 'SET_LOADING' })
      await deleteListing(listingId)
      setMyListing((prevState) =>
        prevState.filter((listing) => listing.id !== listingId)
      )
      toast.success('آگهی با موفقیت حذف شد')
    }
  }

  const onEdit = (listingId) =>
    navigate(`/edit-listing/${listingId}`, { replace: true })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Meta title={`${userInfo.user.name} | پروفایل`} />
      <div className='profile'>
        <header className='profileHeader'>
          <p className='pageHeader'>پروفایل من</p>
          <button onClick={changeThemeHand} className='toggle'>
            {theme === 'light' ? 'حالت شب' : 'حالت روز'}
          </button>
          <button type='button' className='logOut' onClick={onLogout}>
            خروج از حساب
          </button>
        </header>

        <main>
          <div className='profileDetailsHeader'>
            <p className='profileDetailsText'>اطلاعات کاربری</p>
          </div>

          <div className='profileCard'>
            <input
              type='text'
              id='name'
              className='profileName'
              disabled
              value={userInfo.user.name}
            />
            <input
              type='text'
              id='email'
              className='profileEmail'
              disabled
              value={userInfo.user.email}
            />
          </div>

          <Link to='/create-listing' className='createListing'>
            <HomeIcon fill={theme === 'dark' ? '#fff' : '#000'} />
            <p>ایجاد اگهی جدید</p>
            <ArrowLeft
              fill={theme === 'dark' ? '#fff' : '#000'}
              width='1.5em'
            />
          </Link>

          {!isLoading && myListings?.length > 0 && (
            <>
              <p className='listingText'>آگهی های من</p>
              <ul className='listingsList'>
                {myListings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing}
                    id={listing.id}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default Profile
