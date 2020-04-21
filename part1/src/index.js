import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
	return (
		<h1>{props.course}</h1>
	);
}

const Part = (props) => {
	const {part, exercises} = props;

	return (
    <p>
      {part} {exercises}
    </p>
	)
}

const Content = (props) => {
	const {parts} = props;

	return (
		<>
	    <Part part={parts[0].name} exercises={parts[0].exercises}/>
	    <Part part={parts[1].name} exercises={parts[1].exercises}/>
	    <Part part={parts[2].name} exercises={parts[2].exercises}/>
    </>
	);
}

const Total = (props) => {
	const {parts} = props;

	return (
		<p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
	);
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))