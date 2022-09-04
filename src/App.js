import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import SingIn from './pages/SignIn'
import Navbar from './components/Navbar'
import { AuthProvider } from '../src/context/auth/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import { ListingsProvider } from './context/listings/ListingsContext'
import Listing from './pages/Listing'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import { ThemeProvider } from './context/theme/ThemeContext'

function App() {
  return (
    <div>
      <AuthProvider>
        <ListingsProvider>
          <ThemeProvider>
            <Router>
              <Routes>
                <Route path='/' element={<Explore />} />
                <Route path='/profile' element={<PrivateRoute />}>
                  <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path='/sign-in' element={<SingIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/listings/:listingId' element={<Listing />} />
                <Route path='/create-listing' element={<PrivateRoute />}>
                  <Route path='/create-listing' element={<CreateListing />} />
                </Route>
                <Route
                  path='/edit-listing/:listingId'
                  element={<PrivateRoute />}
                >
                  <Route
                    path='/edit-listing/:listingId'
                    element={<EditListing />}
                  />
                </Route>
              </Routes>
              <Navbar />
            </Router>
            <ToastContainer />
          </ThemeProvider>
        </ListingsProvider>
      </AuthProvider>
    </div>
  )
}

export default App
