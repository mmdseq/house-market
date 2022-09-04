import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import ListingsContext from '../context/listings/ListingsContext'
import { getListing } from '../context/listings/ListingsActions'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Meta from '../components/Meta'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function Listing() {
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const { isLoading, listing, dispatch } = useContext(ListingsContext)

  const params = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        dispatch({ type: 'SET_LOADING' })
        const { data } = await getListing(params.listingId)

        dispatch({ type: 'GET_LISTING', payload: data })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message })
      }
    }
    fetchListing()
  }, [params.listingId, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return listing ? (
    <>
      <Meta title={listing.address} />
      <main>
        <div
          className='shareIconDiv'
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
              setShareLinkCopied(false)
            }, 2000)
          }}
        >
          <img src={shareIcon} alt='' />

          <Link to='/'>
            <p className='goback'>بازگشت</p>
          </Link>
        </div>

        {shareLinkCopied && <p className='linkCopied'>لینک کپی شد</p>}

        <div className='listingDetails'>
          <p className='listingName'>
            {listing.name} - &nbsp;
            {listing.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            تومان
          </p>
          <br />
          <p className='listingLocation'>{listing.address}</p>

          <ul className='listingDetailsList'>
            <li>{`${listing.bedrooms} اتاق خواب`}</li>

            <li>{listing.parking && 'پارکینگ دارد'}</li>
            <br />
            <li>{listing.description}</li>
          </ul>
          <h3>شماره تماس:</h3>
          <p>{listing.phoneNumber}</p>
          <p className='listingLocationTitle'>موقعیت مکانی بر روی نقشه</p>
          <div className='leafletContainer'>
            <MapContainer
              style={{ height: '100%', width: '100%' }}
              center={[listing.lat, listing.lng]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              <Marker position={[listing.lat, listing.lng]}>
                <Popup>{listing.address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </main>
    </>
  ) : (
    <h2>هیچ آگهی وجود ندارد</h2>
  )
}

export default Listing
