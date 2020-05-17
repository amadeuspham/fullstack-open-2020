import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import blogCreateReducer from './reducers/blogCreateReducer'
import loginFormReducer from './reducers/loginFormReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'
import commentsReducer from './reducers/commentsReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer, 
  blogCreate: blogCreateReducer,
  loginForm: loginFormReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  comments: commentsReducer,
})

const store = createStore(
	reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
export default store