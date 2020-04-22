import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
	return (
		<button onClick={handleClick}>{text}</button>
	);
}

const AnecdoteOfTheDay = ({anecdote, votesNum, vote, next}) => {
	return (
    <div>
    	<h2>Anecdote of the day</h2>
      {anecdote}
      <br/>
      <p>has {votesNum} votes</p>
      <Button text="vote" handleClick={vote}/>
      <Button text="next anecdote" handleClick={next}/>
    </div>
	);
}

const AnecdoteMostVotes = ({anecdote}) => {
	return (
    <div>
    	<h2>Anecdote with most votes</h2>
      {anecdote}
    </div>
	);
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

  const rand = Math.floor(Math.random() * 6);

  const voteAnecdote = (ind) => {
		const copy = [...points]
		copy[ind] += 1  
		setPoints(copy);
  }

  const mostVotesIndex = points.indexOf(Math.max(...points))
  const anecdoteMostVotes = props.anecdotes[mostVotesIndex]

  return (
  	<div>
	  	<AnecdoteOfTheDay 
	  		anecdote={props.anecdotes[selected]} 
	  		votesNum={points[selected]}
	  		vote={() => voteAnecdote(selected)}
	  		next={() => setSelected(rand)}
	  	/>
	  	<AnecdoteMostVotes anecdote={anecdoteMostVotes}/>
  	</div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)