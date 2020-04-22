import React from 'react'

const Header = ({name}) => {
	return (
		<h1>{name}</h1>
	);
}

const Part = ({part, exercises}) => {
	return (
    <p>
      {part} {exercises}
    </p>
	)
}

const Content = ({parts}) => {
	return (
		<div>
			{parts.map(part => 
				<Part key={part.id} part={part.name} exercises={part.exercises}/>
			)}
		</div>
	);
}

const Total = ({parts}) => {
	const total = parts.reduce(
		(sum, part) => sum + part.exercises,
		0
	);

	return (
		<p>Total number of exercises: {total}</p>
	);
}

const Course = ({course}) => {
	const {name, parts} = course;

	return (
		<div>
			<Header name={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
		</div>
	);
}

export default Course;