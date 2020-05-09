import React, { useState, useEffect } from 'react'

import './App.css'
import Notification from './components/Notification'
import Login from './components/Login'
import UserView from './components/UserView'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Logged in successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    setUser(null)
    setUsername('')
    setPassword('')
    setSuccessMessage('Logged out successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const addBlogToList = (blog) => {
    setBlogs(blogs.concat(blog))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to app</h2>
        <Notification message={successMessage} status='success'/>
        <Notification message={errorMessage} status='error'/>
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={successMessage} status='success'/>
      <Notification message={errorMessage} status='error'/>
      <UserView
        user={user}
        blogs={blogs}
        setBlogs={setBlogs}
        handleLogout={handleLogout}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
        addBlogToList={addBlogToList}
      />
    </div>
  )
}

export default App