import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { initAnecdotes } from './reducers/anecdoteReducer'
import ConnectedFilter from './components/Filter'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedFilter/>
      <Notification/>
      <ConnectedAnecdoteList/>
      <ConnectedAnecdoteForm/>
    </div>
  )
}

export default App