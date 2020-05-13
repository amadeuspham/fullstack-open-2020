const initialState = ""

export const filter = (filter) => {
	return {
		type: 'FILTERING',
		data: {filter}
	}
}

const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'FILTERING':
      return action.data.filter
    default: return state;
  }
}

export default filterReducer