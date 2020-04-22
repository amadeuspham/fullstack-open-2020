import React, {useState} from 'react';
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
	return (
		<button onClick={handleClick}>{text}</button>
	);
}

const Statistic = ({text, value}) => {
	if (text === "positive") {
		return (
			<tr>
				<td>{text}</td> 
				<td>{value} %</td>
			</tr>
		);
	}

	return (
		<tr>
			<td>{text}</td> 
			<td>{value}</td>
		</tr>
	);
}

const Statistics = ({good, neutral, bad}) => {
	if (good === 0 && neutral === 0 && bad === 0) {
		return (
	  	<div>
		    <h2>statistics</h2>
		    <p>No feedback given</p>
	    </div>
		)
	}

  const all_calc = (good, neutral, bad) => {
  	return good + neutral + bad;
  }

  const average_calc = (good, neutral, bad) => {
  	return (good - bad)/(good + neutral + bad);
  }

  const positive_calc = (good, neutral, bad) => {
  	return 100*(good/(good + neutral + bad));
  }

  const all = all_calc(good, neutral, bad);
  const average = average_calc(good, neutral, bad);
  const positive = positive_calc(good, neutral, bad);

  return (
  	<div>
	    <h2>statistics</h2>
	    <table>
		    <tbody>
			    <Statistic text='good' value={good}/>
			    <Statistic text='neutral' value={neutral}/>
			    <Statistic text='bad' value={bad}/>
			    <Statistic text='all' value={all}/>
			    <Statistic text='average' value={average}/>
			    <Statistic text='positive' value={positive}/>
			  </tbody>
	    </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text='good' handleClick={() => setGood(good+1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral+1)}/>
      <Button text='bad' handleClick={() => setBad(bad+1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)