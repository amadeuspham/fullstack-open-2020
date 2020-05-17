export const setUser = (user) => {
	return async dispatch => {
		dispatch({
			type: 'STORE_INFO',
			data: {user}
		})
	}
}

const userReducder = (state = null, action) => {
	switch (action.type) {
		case 'STORE_INFO':
      return action.data.user
		default: return state
	}
}

export default userReducder