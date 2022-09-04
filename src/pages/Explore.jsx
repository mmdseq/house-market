import React, { useContext, useEffect, useState } from 'react'
import ListingItem from '../components/ListingItem'
import Meta from '../components/Meta'
import Spinner from '../components/Spinner'
import { getListings } from '../context/listings/ListingsActions'
import ListingsContext from '../context/listings/ListingsContext'

const Explore = () => {
  const { listings, isLoading, dispatch, isError, message } =
    useContext(ListingsContext)

  const [page, setPage] = useState(2)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        dispatch({ type: 'SET_LOADING' })
        const { data } = await getListings(1)
        dispatch({ type: 'GET_LISTINGS', payload: data })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message })
      }
    }
    fetchListings()
  }, [dispatch])

  const onFetchMoreListings = async () => {
    try {
      dispatch({ type: 'SET_LOADING' })
      const { data } = await getListings(page)
      dispatch({ type: 'GET_LISTINGS', payload: [...listings, ...data] })
      setPage((prevState) => prevState + 1)
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h2>{message}</h2>
  }

  return (
    <>
      <Meta />
      <div className='explore'>
        <header>
          <p className='pageHeader'>اگهی های فروش ملک</p>
        </header>

        {isLoading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className='exploreListings'>
                {listings.map((listing) => (
                  <ListingItem
                    listing={listing}
                    id={listing.id}
                    key={listing.id}
                  />
                ))}
              </ul>
              <br />
              {listings && (
                <p onClick={onFetchMoreListings} className='loadMore'>
                  آگهی های بیشتر
                </p>
              )}
            </main>
          </>
        ) : (
          <p>هیچ آگهی فروشی وجود ندارد</p>
        )}
      </div>
    </>
  )
}

export default Explore
