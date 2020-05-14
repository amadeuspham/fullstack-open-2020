import React from 'react'
import { connect } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addVotedNoti } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = () => {
    const {filter, anecdotes} = props
    return filter === "" 
      ? anecdotes
      : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    props.voteAnecdote(anecdote)
    props.addVotedNoti(`You voted for ${anecdote.content}`, 5)
  }

  return (
    <div>
      {anecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  addVotedNoti,
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList