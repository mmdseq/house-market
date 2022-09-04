import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'
import ThemeContext from '../context/theme/ThemeContext'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const { theme } = useContext(ThemeContext)

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate('/')}>
            <ExploreIcon
              fill={
                theme === 'light'
                  ? pathMatchRoute('/')
                    ? '#2c2c2c'
                    : '#8f8f8f'
                  : pathMatchRoute('/')
                  ? '#aaa'
                  : '#444'
              }
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              آگهی ها
            </p>
          </li>

          <li className='navbarListItem' onClick={() => navigate('/profile')}>
            <PersonOutlineIcon
              fill={
                theme === 'light'
                  ? pathMatchRoute('/profile')
                    ? '#2c2c2c'
                    : '#8f8f8f'
                  : pathMatchRoute('/profile')
                  ? '#aaa'
                  : '#444'
              }
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              پروفایل
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
