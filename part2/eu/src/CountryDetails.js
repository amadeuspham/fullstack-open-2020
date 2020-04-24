import React, {useState} from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_WEATHER_API_KEY;

const CapitalWeather = ({capital}) => {
	const [weather, setWeather] = useState();
	const requestURL = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`;

	if (!weather) {
		axios
		.get(requestURL)
		.then(response => {
			setWeather(response.data)
		});
	}

	if (weather) {
		return(
			<div>
				<p>Temperature: {weather.current.temp_c} degress Celsius, feels like {weather.current.feelslike_c}</p>
				<img src={weather.current.condition.icon} alt={weather.current.condition.text}/>
				<p>Wind: {weather.current.wind_mph} mph, direction {weather.current.wind_dir}</p>
			</div>
		);
	} else {
		return <p>Fetching info... please wait.</p>;
	}
}

export default function CountryDetails(props){
	const {name, capital, population, languages, flag} = props.country;

	return (
		<div>
			<h2>{name}</h2>
			<p>Capital: {capital}</p>
			<p>Population: {population}</p>
			<h3>Languages</h3>
			<ul>
				{languages.map(language => <li key={language.name}>{language.name}</li>)}
			</ul>
			<img src={flag} alt={"Flag of " + name} style={{width:500}}/>
			<h3>Weather in {capital}</h3>
			<CapitalWeather capital={capital}/>
			<p>_________________________________________________</p>
		</div>
	);
}