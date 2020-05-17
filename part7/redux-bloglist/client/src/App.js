import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route,
} from "react-router-dom"
import {
  Container
} from '@material-ui/core'

import './App.css'
import Notification from './components/Notification'
import Login from './components/Login'
import Profile from './components/Profile'
import Users from './components/Users'
import BlogView from './components/BlogView'
import UserView from './components/UserView'
import UserHeader from './components/UserHeader'

import blogService from './services/blogs'
import loginService from './services/login'

import {addNoti} from './reducers/notificationReducer'
import {initBlogs} from './reducers/blogReducer'
import {setUsername, setPassword} from './reducers/loginFormReducer'
import {setUser} from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const loginFormValues = useSelector(state => state.loginForm)
  const {username, password} = loginFormValues

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const newUser = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(newUser)
      )
      blogService.setToken(newUser.token)
      dispatch(setUser(newUser))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      dispatch(addNoti('Logged in successfully', 'success', 5))
    } catch (exception) {
      dispatch(addNoti('Wrong username or password', 'error', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    dispatch(setUser(null))
    dispatch(setUsername(''))
    dispatch(setPassword(''))
    dispatch(addNoti('Logged out successfully', 'success', 5))
  }

  if (user === null) {
    return (
      <Container className='App'>
        <h2>Log in to app</h2>
        <Notification/>
        <Login
          handleLogin={handleLogin}
        />
      </Container>
    )
  }

  return (
    <Container className='App'>
      <UserHeader user={user} handleLogout={handleLogout}/>
      <h2>Blogs</h2>
      <Notification/>
      <Switch>
        <Route path="/users/:id">
          <UserView/>
        </Route>
        <Route path='/users'>
          <Users/>
        </Route>
        <Route path="/blogs/:id">
          <BlogView/>
        </Route>
        <Route path='/'>
          <Profile
            user={user}
          />
        </Route>
      </Switch>
    </Container>
  )
}

export default App