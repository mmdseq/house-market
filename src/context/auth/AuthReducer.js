const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    case 'SIGN_IN':
      return { isLoading: false, isSuccess: true, userInfo: action.payload }
    case 'SIGN_UP':
      return { isLoading: false, isSuccess: true, userInfo: action.payload }
    case 'SET_ERROR':
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      }
    case 'LOGOUT':
      return { userInfo: null }
    case 'RESET':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
      }
    default:
      return state
  }
}

export default authReducer
