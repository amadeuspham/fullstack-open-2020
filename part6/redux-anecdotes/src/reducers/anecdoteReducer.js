import anecdoteService from '../services/anecdotes'

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: {anecdotes}
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: {votedAnecdote}
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: {anecdote}
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'INIT':
      return action.data.anecdotes.sort((a, b) => b.votes - a.votes);
    case 'VOTE':
      const {votedAnecdote} = action.data
      return state
              .map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote)
              .sort((a, b) => b.votes - a.votes);
    case 'ADD':
      return state
              .concat(action.data.anecdote)
              .sort((a, b) => b.votes - a.votes);
    default: return state.sort((a, b) => b.votes - a.votes);
  }
}

export default anecdoteReducer