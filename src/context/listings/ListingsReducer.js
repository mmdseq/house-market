const ListingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    case 'SET_ERROR':
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      }
    case 'GET_LISTINGS':
      return { isLoading: false, listings: action.payload }
    case 'GET_LISTING':
      return {
        ...state,
        isLoading: false,
        listing: action.payload,
      }

    case 'ADD_LISTING':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      }

    case 'DELETE_LISTING':
      return { ...state, isLoading: false, isSuccess: true }

    case 'UPDATE_LISTING':
      return {
        ...state,
        isLoading: false,
        listing: action.payload,
        isSuccess: true,
      }

    case 'RESET':
      return {
        listings: [],
        listing: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
      }
    default:
      return state
  }
}

export default ListingsReducer
