import { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import AuthContext from '../context/auth/AuthContext'
import { Marker, MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { useMemo } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import ListingsContext from '../context/listings/ListingsContext'
import { addListing } from '../context/listings/ListingsActions'
import Meta from '../components/Meta'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function CreateListing() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    description: '',
    bedrooms: 0,
    parking: false,
    price: 0,
    lat: 35.7219,
    lng: 51.3347,
  })

  const {
    name,
    phoneNumber,
    address,
    description,
    bedrooms,
    parking,
    price,
    lat,
    lng,
  } = formData

  const { userInfo } = useContext(AuthContext)
  const { isLoading, dispatch, isError, isSuccess, message } =
    useContext(ListingsContext)

  const navigate = useNavigate()

  const markerRef = useRef(null)

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setFormData((prevState) => ({
          ...prevState,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }))
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setFormData((prevState) => ({
            ...prevState,
            lat: marker.getLatLng().lat,
            lng: marker.getLatLng().lng,
          }))
        }
      },
    }),
    []
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch({ type: 'RESET' })
      navigate('/')
    }
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch({ type: 'SET_LOADING' })
      const formDataCopy = {
        ...formData,
        userRef: userInfo.user.id,
        timestamp: new Date().getTime(),
      }

      const data = await addListing(formDataCopy)
      dispatch({ type: 'ADD_LISTING', payload: data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '?????????? ???????? ???????????? ??????' })
    }
  }

  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: boolean ?? e.target.value,
    }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Meta title={'???????? ????????'} />
      <div className='profile'>
        <header>
          <p className='pageHeader'>?????????? ???????? ????????</p>
          <Link to={'/profile'}>
            <p className='goback pageHeaderp'>????????????</p>
          </Link>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <label className='formLabel'>?????? ????????</label>
            <input
              className='formInputName'
              type='text'
              id='name'
              value={name}
              onChange={onMutate}
              maxLength='32'
              minLength='5'
              required
              placeholder='?????? ???????? ???? ???????? ????????'
            />
            <label className='formLabel'>?????????? ????????</label>
            <input
              className='formInputName'
              type='number'
              id='phoneNumber'
              value={phoneNumber}
              onChange={onMutate}
              required
              placeholder='?????????? ???????? ?????? ???? ???????? ????????'
            />

            <div className='formRooms flex'>
              <div>
                <label className='formLabel'>?????????? ????????</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='bedrooms'
                  value={bedrooms}
                  onChange={onMutate}
                  min='0'
                  max='50'
                  required
                />
              </div>
            </div>

            <label className='formLabel'>?????????????? ????????</label>
            <div className='formButtons'>
              <button
                className={parking ? 'formButtonActive' : 'formButton'}
                type='button'
                id='parking'
                value={true}
                onClick={onMutate}
                min='1'
                max='50'
              >
                ??????
              </button>
              <button
                className={
                  !parking && parking !== null
                    ? 'formButtonActive'
                    : 'formButton'
                }
                type='button'
                id='parking'
                value={false}
                onClick={onMutate}
              >
                ??????
              </button>
            </div>

            <label className='formLabel'>????????</label>
            <textarea
              className='formInputAddress'
              type='text'
              id='address'
              value={address}
              onChange={onMutate}
              required
              placeholder='???????? ???? ???????? ????????'
            />

            <label className='formLabel'>??????????????</label>
            <input
              className='formInputName'
              type='text'
              id='description'
              value={description}
              onChange={onMutate}
              maxLength='50'
              minLength='10'
              required
              placeholder='?????????????? ?????? ???? ???????? ????????'
            />

            <label className='formLabel'>????????</label>
            <div className='formPriceDiv'>
              <input
                className='formInputSmall'
                type='number'
                id='price'
                value={price}
                onChange={onMutate}
                min='0'
                max='1000000000000'
                required
                step={10000000}
              />
              ??????????
            </div>
            <label className='formLabel'>???????????? ?????????? ???? ???????? ????????</label>
            <div className='leafletContainer'>
              <MapContainer
                style={{ height: '100%', width: '100%' }}
                center={[lat, lng]}
                zoom={15}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker
                  draggable={true}
                  eventHandlers={eventHandlers}
                  position={[lat, lng]}
                  ref={markerRef}
                  scrollWheelZoom={false}
                ></Marker>
                <LocationMarker />
              </MapContainer>
            </div>

            <button type='submit' className='primaryButton createListingButton'>
              ?????????? ????????
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export default CreateListing
