const initialState = null

let timeoutID = null;

export const addNoti = (noti, type, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'VOTED',
      data: {noti, type}
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch({
      type: 'DELETE'  
    }), timeout*1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTED':
      return {noti: action.data.noti, type: action.data.type}
    case 'DELETE': 
      return null
    default: return state;
  }
}

export default notificationReducer