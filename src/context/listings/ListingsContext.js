import { createContext, useReducer } from 'react'
import listingsReducer from './ListingsReducer'

const ListingsContext = createContext()

export const ListingsProvider = ({ children }) => {
  const initialState = {
    listings: [],
    listing: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  }

  const [state, dispatch] = useReducer(listingsReducer, initialState)

  return (
    <ListingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListingsContext.Provider>
  )
}

export default ListingsContext
