import React, {useState, useEffect} from 'react'
import {useMutation } from '@apollo/client';

import {LOGIN} from '../queries'

const Login = ({ show, setError, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      window.localStorage.setItem('libraryUser', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    setPage('authors')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <input id='username' value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          <input id='password' value={password} type="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button id='login-button' type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default Login