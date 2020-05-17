const initialState = {
  username: '',
  password: '',
}

export const setUsername = (usernameInput) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USERNAME',
      data: {usernameInput}
    })
  }
}

export const setPassword = (passwordInput) => {
  return async dispatch => {
    dispatch({
      type: 'SET_PASSWORD',
      data: {passwordInput}
    })
  }
}

const loginFormReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_USERNAME':
      return {...state, username: action.data.usernameInput}
    case 'SET_PASSWORD': 
      return {...state, password: action.data.passwordInput}
    default: return state;
  }
}

export default loginFormReducer