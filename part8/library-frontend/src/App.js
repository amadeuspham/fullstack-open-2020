import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client';

import Authors from './components/Authors'
import Books from './components/Books'
import Recommended from './components/Recommended'
import NewBook from './components/NewBook'
import Login from './components/Login'

const Notify = ({error}) => {
  if ( !error ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {error}
    </div>
  )
}

const Logout = ({setPage, setToken}) => {
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <button onClick={handleLogout}>logout</button>
  )
}

const App = () => {
  
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [error, setError] = useState('')

  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <>
          <button onClick={() => setPage('recommended')}>recommended</button>
          <button onClick={() => setPage('add')}>add book</button>
          </>
        }
        {token 
          ? <Logout setPage={setPage} setToken={setToken}/>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      <Notify error={error}/>

      <Login
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />

      <Authors
        show={page === 'authors'}
        token={token}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommended
        show={page === 'recommended'}
      />

    </div>
  )
}

export default App