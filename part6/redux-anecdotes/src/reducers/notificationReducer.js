const initialState = "We need to talk mate"

export const addVotedNoti = (noti, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'VOTED',
      data: {noti}
    })
    setTimeout(() => dispatch({
      type: 'DELETE'  
    }), timeout*1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTED':
      return action.data.noti
    case 'DELETE': 
      return null
    default: return state;
  }
}

export default notificationReducer