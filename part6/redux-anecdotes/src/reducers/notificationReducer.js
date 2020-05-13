const initialState = "We need to talk mate"

export const addVotedNoti = (content) => {
  return {
    type: 'VOTED',
    data: {content}
  }
}

export const deleteNoti = () => {
  return {
    type: 'DELETE'
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTED':
      return `You voted '${action.data.content}'`
    case 'DELETE': 
      return null
    default: return state;
  }
}

export default notificationReducer