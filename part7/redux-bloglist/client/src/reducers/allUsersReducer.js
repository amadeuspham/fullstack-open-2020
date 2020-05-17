import userService from '../services/user'

export const initAllUsers = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch({
			type: 'INIT_USERS',
			data: {users}
		})
	}
}

const allUsersReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_USERS':
      return action.data.users
		default: return state
	}
}

export default allUsersReducer