import axios from 'axios'
const API_URL = 'http://localhost:5000'

export const getListings = async (page) => {
  const data = await axios.get(
    API_URL + `/listings?_sort=timestamp&_order=desc&_page=${page}&_limit=2`
  )

  return data
}
export const getMyListings = async (userId) => {
  const data = await axios.get(
    API_URL + `/listings?userRef=${userId}&_sort=timestamp&_order=desc`
  )

  return data
}
export const getListing = async (id) => {
  const data = await axios.get(API_URL + `/listings/${id}`)

  return data
}
export const addListing = async (formData) => {
  const data = await axios.post(API_URL + `/listings`, formData)

  return data
}

export const updateListing = async (listingId, formData) => {
  const data = await axios.put(API_URL + `/listings/${listingId}`, formData)

  return data
}

export const deleteListing = async (listingId) => {
  await axios.delete(API_URL + `/listings/${listingId}`)
}
